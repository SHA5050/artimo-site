import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILE_COUNT = 10;

// Extension → MIME type mapping for allowed engineering document types
const ALLOWED_EXTENSIONS: Record<string, string[]> = {
  "pdf":   ["application/pdf"],
  "png":   ["image/png"],
  "jpg":   ["image/jpeg"],
  "jpeg":  ["image/jpeg"],
  "gif":   ["image/gif"],
  "webp":  ["image/webp"],
  "dwg":   ["application/acad", "application/dwg", "application/octet-stream"],
  "dxf":   ["application/dxf", "application/octet-stream"],
  "step":  ["application/step", "application/octet-stream"],
  "stp":   ["application/step", "application/octet-stream"],
  "igs":   ["application/iges", "application/octet-stream"],
  "iges":  ["application/iges", "application/octet-stream"],
  "doc":   ["application/msword"],
  "docx":  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  "xls":   ["application/vnd.ms-excel"],
  "xlsx":  ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  "txt":   ["text/plain"],
  "csv":   ["text/csv", "text/plain"],
};

// Magic byte signatures for binary file type verification
const MAGIC_SIGNATURES: Record<string, number[]> = {
  "pdf":  [0x25, 0x50, 0x44, 0x46],                              // %PDF
  "png":  [0x89, 0x50, 0x4E, 0x47],                              // PNG signature
  "jpg":  [0xFF, 0xD8, 0xFF],                                     // JPEG SOI
  "jpeg": [0xFF, 0xD8, 0xFF],
  "gif":  [0x47, 0x49, 0x46, 0x38],                              // GIF8
  "zip":  [0x50, 0x4B, 0x03, 0x04],                              // PK (docx/xlsx are ZIP)
  "doc":  [0xD0, 0xCF, 0x11, 0xE0],                              // OLE2 compound doc
  "xls":  [0xD0, 0xCF, 0x11, 0xE0],                              // OLE2 compound doc
};

// Office Open XML formats (docx, xlsx) are ZIP containers — detected by PK signature
const OFFICE_OPEN_XML_EXTENSIONS = ["docx", "xlsx", "step", "stp", "igs", "iges"];

function getExtension(filename: string): string {
  const parts = filename.toLowerCase().split(".");
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

async function verifyMagicBytesAsync(file: File, ext: string): Promise<boolean> {
  const sig = MAGIC_SIGNATURES[ext];
  if (!sig) return true;

  // For Office Open XML (docx/xlsx), check ZIP signature
  const checkSig = OFFICE_OPEN_XML_EXTENSIONS.includes(ext) ? MAGIC_SIGNATURES["zip"] : sig;
  if (!checkSig) return true;

  const buf = new Uint8Array(await file.arrayBuffer());
  if (buf.length < checkSig.length) return false;

  for (let i = 0; i < checkSig.length; i++) {
    if (buf[i] !== checkSig[i]) return false;
  }
  return true;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const formData = await req.formData();

    const productType = formData.get("product_type") as string;
    const companyName = formData.get("company_name") as string;
    const contactName = formData.get("contact_name") as string;
    const email = formData.get("email") as string;
    const notes = (formData.get("notes") as string) || "";
    const engineeringDataRaw = formData.get("engineering_data");

    // --- Validate required text fields ---
    if (!productType || !productType.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: "Product type is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!companyName || !companyName.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: "Company name is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "A valid email address is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Parse engineering_data ---
    let engineeringData: Record<string, unknown> = {};
    if (engineeringDataRaw) {
      try {
        engineeringData = JSON.parse(engineeringDataRaw as string);
      } catch {
        engineeringData = { raw: engineeringDataRaw as string };
      }
    }

    // --- Validate and collect files ---
    // The full multi-product frontend sends files under "files[]" (PHP-style array notation);
    // the simplified frontend used "files". Accept both for compatibility.
    const files = [
      ...formData.getAll("files"),
      ...formData.getAll("files[]"),
    ].filter((f): f is File => f instanceof File && f.size > 0);

    if (files.length > MAX_FILE_COUNT) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Too many files. Maximum ${MAX_FILE_COUNT} files allowed; you uploaded ${files.length}.`,
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validFileUrls: { name: string; url: string }[] = [];

    if (files.length > 0) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

      const supabase = createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false },
      });

      for (const file of files) {
        // 1. Size check
        if (file.size > MAX_FILE_SIZE) {
          return new Response(
            JSON.stringify({
              success: false,
              error: `File "${file.name}" exceeds the 10 MB limit (${(file.size / 1048576).toFixed(1)} MB).`,
            }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // 2. Extension check
        const ext = getExtension(file.name);
        if (!ext || !(ext in ALLOWED_EXTENSIONS)) {
          return new Response(
            JSON.stringify({
              success: false,
              error: `File "${file.name}" has an unsupported extension (.${ext || "none"}). Allowed: PDF, PNG, JPG, GIF, WEBP, DWG, DXF, STEP, STP, IGS, IGES, DOC, DOCX, XLS, XLSX, TXT, CSV.`,
            }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // 3. MIME type check (relaxed for CAD formats that report octet-stream)
        const allowedMimes = ALLOWED_EXTENSIONS[ext];
        const fileMime = (file.type || "application/octet-stream").toLowerCase();
        if (!allowedMimes.includes(fileMime) && fileMime !== "application/octet-stream") {
          return new Response(
            JSON.stringify({
              success: false,
              error: `File "${file.name}" has an unsupported content type (${fileMime}).`,
            }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // 4. Magic byte (file signature) verification for binary formats
        const magicValid = await verifyMagicBytesAsync(file, ext);
        if (!magicValid) {
          return new Response(
            JSON.stringify({
              success: false,
              error: `File "${file.name}" failed signature verification. The file content does not match its extension.`,
            }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // 5. Upload to Storage
        const safeName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${ext}`;
        const path = `rfq/${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("rfq-uploads")
          .upload(path, file, {
            contentType: fileMime,
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          return new Response(
            JSON.stringify({
              success: false,
              error: `Failed to upload file "${file.name}". Please try again.`,
            }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        validFileUrls.push({
          name: file.name,
          url: `${supabaseUrl}/storage/v1/object/public/rfq-uploads/${path}`,
        });
      }
    }

    // --- Insert RFQ record ---
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const { data: insertData, error: insertError } = await supabase
      .from("rfq_submissions")
      .insert({
        product_type: productType,
        company_name: companyName,
        contact_name: contactName || null,
        email: email,
        industry: (engineeringData.industry as string) || null,
        application: (engineeringData.application as string) || null,
        delivery_date: (engineeringData.delivery_date as string) || null,
        engineering_data: engineeringData,
        notes: notes,
        file_urls: validFileUrls,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError.message);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to submit RFQ. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: insertData.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("submit-rfq error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "An unexpected error occurred." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
