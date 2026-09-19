import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const formData = await req.formData();

    const productType = formData.get("product_type");
    const companyName = formData.get("company_name");
    const contactName = formData.get("contact_name");
    const email = formData.get("email");
    const notes = formData.get("notes");
    const engineeringDataRaw = formData.get("engineering_data");

    if (!productType || !companyName || !email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: product_type, company_name, email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let engineeringData: Record<string, string> = {};
    if (engineeringDataRaw) {
      try {
        engineeringData = JSON.parse(engineeringDataRaw as string);
      } catch {
        engineeringData = { raw: engineeringDataRaw as string };
      }
    }

    // Collect uploaded files
    const files = formData.getAll("files[]");
    const fileUrls: { name: string; url: string }[] = [];

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    for (const file of files) {
      if (file instanceof File) {
        const ext = file.name.split(".").pop() || "bin";
        const safeName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${ext}`;
        const path = `rfq/${safeName}`;

        const { error: uploadError } = await supabase
          .storage
          .from("rfq-uploads")
          .upload(path, file, { contentType: file.type || "application/octet-stream", upsert: false });

        if (!uploadError) {
          const { data: publicUrlData } = supabase
            .storage
            .from("rfq-uploads")
            .getPublicUrl(path);

          fileUrls.push({ name: file.name, url: publicUrlData.publicUrl });
        }
      }
    }

    const { data, error } = await supabase
      .from("rfq_submissions")
      .insert({
        product_type: productType as string,
        company_name: companyName as string,
        contact_name: contactName as string || null,
        email: email as string,
        engineering_data: engineeringData,
        notes: notes as string || null,
        file_urls: fileUrls,
      })
      .select("id")
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: "Failed to save RFQ submission" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
