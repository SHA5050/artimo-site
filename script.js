document.addEventListener("DOMContentLoaded", function () {


/*
ARTIMO Core Interaction System
PVIS-001 Product Visual Identification System Foundation
*/


// Active Navigation Highlight

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("nav a").forEach(link => {

    if(link.getAttribute("href") === currentPage){

        link.classList.add("active");

    }

});





// Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});






// PVIS Product Identification Data Layer

const productLibrary = {


    bolts:{

        name:"Bolts & Screws",

        items:[

            "Hex Bolt",

            "Heavy Hex Bolt",

            "Stud Bolt",

            "Socket Screw",

            "Anchor Bolt",

            "U-Bolt"

        ]

    },


    nuts:{

        name:"Nuts",

        items:[

            "Hex Nut",

            "Heavy Hex Nut",

            "Lock Nut"

        ]

    },


    washers:{

        name:"Washers",

        items:[

            "Flat Washer",

            "Spring Washer"

        ]

    }


};





// Product Search Function

window.searchProduct = function(category){


    const resultBox = document.getElementById("product-results");


    if(!resultBox){

        return;

    }


    const product = productLibrary[category];


    if(product){


        resultBox.innerHTML = `

        <h3>${product.name}</h3>

        <ul>

        ${product.items.map(item => `<li>${item}</li>`).join("")}

        </ul>

        `;


    }


};








// RFQ Preparation Message

const rfqButtons = document.querySelectorAll(".btn");


rfqButtons.forEach(button => {


button.addEventListener("click", function(){


    const text = this.innerText.toLowerCase();


    if(text.includes("rfq") || text.includes("request")){


        console.log(

        "ARTIMO RFQ Process Started: Engineering Review → Technical Evaluation → Quotation"

        );


    }


});


});







// Lightweight Animation Observer

const observer = new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


    if(entry.isIntersecting){

        entry.target.classList.add("visible");

    }


});


},{

threshold:0.15

});



document.querySelectorAll(".card, .section").forEach(element=>{

    observer.observe(element);

});






// ARTIMO System Status

console.log(

"ARTIMO AMOS ACTIVE | PVIS-001 Loaded | Engineering Procurement System Ready"

);


/* =====================================================
   PHASE 1 ADDITIONS
   ===================================================== */


// --- MOBILE NAV TOGGLE ---

const navToggle = document.querySelector(".nav-toggle");
const siteNav   = document.querySelector("nav");

if(navToggle && siteNav){

    navToggle.addEventListener("click", function(){

        const isOpen = siteNav.classList.toggle("open");

        navToggle.classList.toggle("open", isOpen);

        navToggle.setAttribute("aria-expanded", isOpen);

    });

    // Close on outside click
    document.addEventListener("click", function(e){

        if(!navToggle.contains(e.target) && !siteNav.contains(e.target)){

            siteNav.classList.remove("open");
            navToggle.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");

        }

    });

    // Close when a nav link is clicked
    siteNav.querySelectorAll("a").forEach(function(link){

        link.addEventListener("click", function(){

            siteNav.classList.remove("open");
            navToggle.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");

        });

    });

}


// --- DYNAMIC ENGINEERING FIELD SCHEMA ---

const engineeringSchemas = {

    "Hex Bolt": [
        { field: "diameter",    label: "Diameter",                 placeholder: "e.g. M20 / 3/4\"" },
        { field: "length",      label: "Length",                   placeholder: "e.g. 80mm / 3\"" },
        { field: "thread-pitch", label: "Thread Pitch",             placeholder: "e.g. 2.5mm / 10 TPI" },
        { field: "thread-type", label: "Thread Type",              placeholder: "e.g. Metric, UNC, UNF" },
        { field: "material-grade", label: "Material Grade",       placeholder: "e.g. 8.8, 10.9, A325, 316 SS" }
    ],

    "Heavy Hex Bolt": [
        { field: "diameter",    label: "Diameter",                 placeholder: "e.g. M24 / 1\"" },
        { field: "length",      label: "Length",                   placeholder: "e.g. 100mm / 4\"" },
        { field: "thread-pitch", label: "Thread Pitch",             placeholder: "e.g. 3.0mm / 8 TPI" },
        { field: "thread-type", label: "Thread Type",              placeholder: "e.g. Metric, UNC, UNF" },
        { field: "material-grade", label: "Material Grade",       placeholder: "e.g. A193 B7, B8M, 2H, 10.9" }
    ],

    "Stud Bolt": [
        { field: "diameter",    label: "Diameter",                 placeholder: "e.g. 5/8\" / M16" },
        { field: "length",      label: "Length",                   placeholder: "e.g. 3-1/2\" / 90mm" },
        { field: "thread-pitch", label: "Thread Pitch",             placeholder: "e.g. 11 TPI / 2.0mm" },
        { field: "thread-type", label: "Thread Type",              placeholder: "e.g. Full thread, tap end, UNC" },
        { field: "material-grade", label: "Material Grade",       placeholder: "e.g. B7, B8 Class 2, B8M" }
    ],

    "Socket Screw": [
        { field: "diameter",    label: "Diameter",                 placeholder: "e.g. M10 / 3/8\"" },
        { field: "length",      label: "Length",                   placeholder: "e.g. 40mm / 1-1/2\"" },
        { field: "thread-pitch", label: "Thread Pitch",             placeholder: "e.g. 1.5mm / 16 TPI" },
        { field: "thread-type", label: "Thread Type",              placeholder: "e.g. Metric, UNC, UNF" },
        { field: "material-grade", label: "Material Grade",       placeholder: "e.g. 12.9, A2-70, A4-80" },
        { field: "standard",   label: "Standard",                 placeholder: "e.g. DIN 912, ISO 4762, ASTM A574" }
    ],

    "Hex Nut": [
        { field: "nominal-diameter", label: "Nominal Diameter",   placeholder: "e.g. M20 / 3/4\"" },
        { field: "thread",       label: "Thread",                   placeholder: "e.g. 2.5mm / 10 TPI" },
        { field: "material-grade", label: "Material Grade",        placeholder: "e.g. 8, 10, A563 Grade B, 316 SS" },
        { field: "standard",   label: "Standard",                 placeholder: "e.g. DIN 934, ISO 4032, ASTM A563" }
    ],

    "Heavy Hex Nut": [
        { field: "nominal-diameter", label: "Nominal Diameter",   placeholder: "e.g. M24 / 1\"" },
        { field: "thread",       label: "Thread",                   placeholder: "e.g. 3.0mm / 8 TPI" },
        { field: "material-grade", label: "Material Grade",        placeholder: "e.g. 2H, 7M, 7, 316 SS" },
        { field: "standard",   label: "Standard",                 placeholder: "e.g. ASTM A194 2H, 7M, DIN 6915" }
    ],

    "Lock Nut": [
        { field: "nominal-diameter", label: "Nominal Diameter",   placeholder: "e.g. M16 / 5/8\"" },
        { field: "thread",       label: "Thread",                   placeholder: "e.g. 2.0mm / 14 TPI" },
        { field: "material-grade", label: "Material Grade",        placeholder: "e.g. 8, A2-70, 316 SS" },
        { field: "locking-type", label: "Locking Type",           placeholder: "e.g. Nylon insert, all-metal, prevailing torque" },
        { field: "standard",   label: "Standard",                 placeholder: "e.g. DIN 985, ISO 10511, IFI-100" }
    ],

    "Anchor Bolt": [
        { field: "diameter",    label: "Diameter",                 placeholder: "e.g. M24 / 1\"" },
        { field: "overall-length", label: "Overall Length",       placeholder: "e.g. 300mm / 12\"" },
        { field: "thread-length", label: "Thread Length",          placeholder: "e.g. 100mm / 4\"" },
        { field: "anchor-type", label: "Anchor Type",             placeholder: "e.g. L-bolt, J-bolt, headed, wedge" },
        { field: "material-grade", label: "Material Grade",       placeholder: "e.g. F1554 Grade 36, 55, 105" },
        { field: "standard",   label: "Standard",                 placeholder: "e.g. ASTM F1554, A307" }
    ],

    "U-Bolt": [
        { field: "rod-diameter", label: "Rod Diameter",           placeholder: "e.g. M16 / 5/8\"" },
        { field: "inside-width", label: "Inside Width",           placeholder: "e.g. 50mm / 2\"" },
        { field: "leg-length",  label: "Leg Length",               placeholder: "e.g. 100mm / 4\"" },
        { field: "thread-length", label: "Thread Length",          placeholder: "e.g. 50mm / 2\"" },
        { field: "thread",       label: "Thread",                 placeholder: "e.g. 2.0mm / 14 TPI" },
        { field: "material",   label: "Material",                 placeholder: "e.g. Carbon steel, 316 SS, Galvanized" }
    ],

    "Flat Washer": [
        { field: "nominal-diameter", label: "Nominal Diameter",   placeholder: "e.g. M20 / 3/4\"" },
        { field: "inner-diameter", label: "Inner Diameter",        placeholder: "e.g. 21mm / 0.84\"" },
        { field: "outer-diameter", label: "Outer Diameter",        placeholder: "e.g. 37mm / 1.46\"" },
        { field: "thickness",    label: "Thickness",                placeholder: "e.g. 3mm / 0.12\"" },
        { field: "material-grade", label: "Material Grade",       placeholder: "e.g. 100HV, 300HV, 316 SS, F436" },
        { field: "standard",   label: "Standard",                 placeholder: "e.g. DIN 125, ISO 7089, ASTM F436" }
    ],

    "Spring Washer": [
        { field: "nominal-diameter", label: "Nominal Diameter",   placeholder: "e.g. M16 / 5/8\"" },
        { field: "inner-diameter", label: "Inner Diameter",        placeholder: "e.g. 17mm / 0.67\"" },
        { field: "outer-diameter", label: "Outer Diameter",        placeholder: "e.g. 32mm / 1.26\"" },
        { field: "thickness",    label: "Thickness",                placeholder: "e.g. 3mm / 0.12\"" },
        { field: "material-grade", label: "Material Grade",       placeholder: "e.g. Spring Steel, 65Mn, 316 SS" },
        { field: "standard",   label: "Standard",                 placeholder: "e.g. DIN 127, DIN 128, ISO 10673" }
    ],

    "Special Fastener": [
        { field: "product-specification", label: "Product Specification", placeholder: "e.g. Custom fastener description" },
        { field: "diameter",    label: "Diameter / Size",           placeholder: "e.g. As specified" },
        { field: "length",      label: "Length",                   placeholder: "e.g. As specified" },
        { field: "thread",       label: "Thread",                 placeholder: "e.g. As specified" },
        { field: "material-grade", label: "Material / Grade",     placeholder: "e.g. As specified on drawing" },
        { field: "standard",   label: "Standard / Drawing Reference", placeholder: "e.g. Custom drawing, proprietary spec" },
        { field: "critical-dimensions", label: "Critical Dimensions", placeholder: "e.g. Per drawing / as specified" },
        { field: "coating",    label: "Coating / Surface Treatment", placeholder: "e.g. HDG, PTFE, Zinc plate" },
        { field: "quantity",    label: "Quantity",                 placeholder: "e.g. 50 pcs" }
    ]

};


const rfqProductSelect = document.getElementById("rfq-product");
const rfqEngineeringFields = document.getElementById("rfq-engineering-fields");


if(rfqProductSelect && rfqEngineeringFields){

    rfqProductSelect.addEventListener("change", function(){

        const productType = this.value;

        if(!productType){
            rfqEngineeringFields.innerHTML = '<p class="rfq-schema-hint">Select a product type to load the corresponding engineering fields.</p>';
            return;
        }

        const schema = engineeringSchemas[productType];

        if(!schema){
            rfqEngineeringFields.innerHTML = '<p class="rfq-schema-hint">Select a product type to load the corresponding engineering fields.</p>';
            return;
        }

        let html = '<p class="rfq-schema-label">Engineering Specification — ' + productType + '</p>';

        // Group fields into rows of 2
        for(let i = 0; i < schema.length; i++){

            const field = schema[i];
            const isTextarea = field.type === "textarea";
            const fieldId = "rfq-" + field.field;

            if(!isTextarea && i < schema.length - 1 && i % 2 === 0 && schema[i+1] && schema[i+1].type !== "textarea"){

                // Two-column row
                const field2 = schema[i+1];
                const fieldId2 = "rfq-" + field2.field;

                html += '<div class="rfq-form-row">';
                html += '  <div class="rfq-form-group">';
                html += '    <label for="' + fieldId + '">' + field.label + '</label>';
                html += '    <input type="text" id="' + fieldId + '" data-amos-field="' + field.field + '" placeholder="' + field.placeholder + '">';
                html += '  </div>';
                html += '  <div class="rfq-form-group">';
                html += '    <label for="' + fieldId2 + '">' + field2.label + '</label>';
                html += '    <input type="text" id="' + fieldId2 + '" data-amos-field="' + field2.field + '" placeholder="' + field2.placeholder + '">';
                html += '  </div>';
                html += '</div>';
                i++; // skip next field since we consumed it

            } else {

                // Full-width field
                html += '<div class="rfq-form-group">';
                html += '  <label for="' + fieldId + '">' + field.label + '</label>';
                if(isTextarea){
                    html += '  <textarea id="' + fieldId + '" data-amos-field="' + field.field + '" placeholder="' + field.placeholder + '"></textarea>';
                } else {
                    html += '  <input type="text" id="' + fieldId + '" data-amos-field="' + field.field + '" placeholder="' + field.placeholder + '">';
                }
                html += '</div>';
            }
        }

        rfqEngineeringFields.innerHTML = html;

        // Attach error-clearing listeners to new fields
        rfqEngineeringFields.querySelectorAll("input, textarea, select").forEach(function(newField){

            newField.addEventListener("input", function(){

                const err = this.parentElement.querySelector(".rfq-form-error");

                if(err) err.style.display = "none";

                this.style.borderColor = "";

            });

        });

    });

}


// --- RFQ FORM HANDLER (AMOS-compatible frontend) ---

const SUPABASE_URL = "https://bjdmdtywlmahbkeyalwr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZG1kdHl3bG1haGJrZXlhbHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3NTMyMTEsImV4cCI6MjEwMTMyOTIxMX0.jyL_v_MWPDmsGY4KdQalvm8mrOdAW9_v7IQYpaT5Jv4";
const RFQ_ENDPOINT = SUPABASE_URL + "/functions/v1/submit-rfq";

const rfqForm    = document.getElementById("amos-rfq-form");
const rfqSuccess = document.getElementById("rfq-success");

// --- FILE UPLOAD SUPPORT ---
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
let selectedFiles = [];
let isSubmitting = false;

const fileDrop    = document.getElementById("rfq-file-drop");
const fileInput   = document.getElementById("rfq-files");
const fileListEl  = document.getElementById("rfq-file-list");

if(fileInput && fileDrop){

    fileDrop.addEventListener("click", function(){
        fileInput.click();
    });

    fileInput.addEventListener("change", function(){
        addFiles(this.files);
        this.value = "";
    });

    fileDrop.addEventListener("dragover", function(e){
        e.preventDefault();
        fileDrop.classList.add("dragover");
    });

    fileDrop.addEventListener("dragleave", function(){
        fileDrop.classList.remove("dragover");
    });

    fileDrop.addEventListener("drop", function(e){
        e.preventDefault();
        fileDrop.classList.remove("dragover");
        addFiles(e.dataTransfer.files);
    });
}

function addFiles(fileList){
    for(var i = 0; i < fileList.length; i++){
        var f = fileList[i];
        if(f.size > MAX_FILE_SIZE){
            renderFileItem(f, true);
            continue;
        }
        selectedFiles.push(f);
        renderFileItem(f, false);
    }
}

function renderFileItem(file, isError){
    var li = document.createElement("li");
    li.className = "rfq-file-item";

    var name = document.createElement("span");
    name.className = "rfq-file-item-name";
    name.textContent = file.name + " (" + formatSize(file.size) + ")";
    li.appendChild(name);

    if(isError){
        li.style.borderColor = "#ff8888";
        var err = document.createElement("span");
        err.className = "rfq-file-item-error";
        err.textContent = "Exceeds 10MB";
        li.appendChild(err);
    } else {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "rfq-file-item-remove";
        btn.textContent = "\u00d7";
        btn.addEventListener("click", function(){
            var idx = selectedFiles.indexOf(file);
            if(idx > -1) selectedFiles.splice(idx, 1);
            li.remove();
        });
        li.appendChild(btn);
    }

    fileListEl.appendChild(li);
}

function formatSize(bytes){
    if(bytes < 1024) return bytes + " B";
    if(bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
}

function showFormError(message){
    var existing = rfqForm.querySelector(".rfq-submit-error");
    if(existing) existing.remove();
    var errEl = document.createElement("p");
    errEl.className = "rfq-submit-error";
    errEl.style.color = "#ff8888";
    errEl.style.marginTop = "12px";
    errEl.textContent = message;
    var btn = rfqForm.querySelector(".rfq-submit-btn");
    if(btn) btn.parentElement.appendChild(errEl);
}

if(rfqForm){

    rfqForm.addEventListener("submit", async function(e){

        e.preventDefault();

        if(isSubmitting) return;

        let valid = true;

        // Required field validation
        rfqForm.querySelectorAll("[required]").forEach(function(field){

            const err = field.parentElement.querySelector(".rfq-form-error");

            if(!field.value.trim()){

                if(err) err.style.display = "block";
                field.style.borderColor   = "#ff8888";
                valid = false;

            } else {

                if(err) err.style.display = "none";
                field.style.borderColor   = "";

            }

        });

        // Email format check
        const emailField = rfqForm.querySelector("[type='email']");

        if(emailField && emailField.value){

            const ok  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value);
            const err = emailField.parentElement.querySelector(".rfq-form-error");

            if(!ok){

                if(err){ err.textContent = "Please enter a valid email address."; err.style.display = "block"; }
                emailField.style.borderColor = "#ff8888";
                valid = false;

            }

        }

        if(!valid) return;

        // Collect all dynamic engineering fields from the rendered schema area
        var engineeringData = {};
        var engFields = rfqEngineeringFields.querySelectorAll("input, textarea, select");
        engFields.forEach(function(f){
            var key = f.getAttribute("data-amos-field");
            if(key) engineeringData[key] = f.value || "";
        });

        // Collect static top-level fields
        var productType = rfqForm.querySelector("[data-amos-field='product-type']").value;
        var company     = rfqForm.querySelector("[data-amos-field='company']").value;
        var contactName = rfqForm.querySelector("[data-amos-field='contact-name']").value;
        var email       = rfqForm.querySelector("[data-amos-field='email']").value;
        var industry    = rfqForm.querySelector("[data-amos-field='industry']").value;
        var application = rfqForm.querySelector("[data-amos-field='application']").value;
        var deliveryDate= rfqForm.querySelector("[data-amos-field='delivery-date']").value;

        // Merge static fields into engineering_data so nothing is lost
        if(industry)    engineeringData.industry = industry;
        if(application) engineeringData.application = application;
        if(deliveryDate) engineeringData.delivery_date = deliveryDate;

        // Build multipart form data
        var formData = new FormData();
        formData.append("product_type", productType);
        formData.append("company_name", company);
        formData.append("contact_name", contactName || "");
        formData.append("email", email);
        formData.append("engineering_data", JSON.stringify(engineeringData));
        formData.append("notes", engineeringData.notes || "");

        // Append files
        for(var i = 0; i < selectedFiles.length; i++){
            formData.append("files[]", selectedFiles[i]);
        }

        // Submit to Edge Function
        isSubmitting = true;
        var submitBtn = rfqForm.querySelector(".rfq-submit-btn");
        if(submitBtn){ submitBtn.disabled = true; submitBtn.classList.add("uploading"); submitBtn.textContent = "Submitting..."; }

        try {
            var res = await fetch(RFQ_ENDPOINT, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + SUPABASE_ANON_KEY
                },
                body: formData
            });

            if(!res.ok){
                var errBody = {};
                try { errBody = await res.json(); } catch {}
                throw new Error(errBody.error || "Submission failed (" + res.status + ")");
            }

            var result = await res.json();

            if(!result.success){
                throw new Error(result.error || "Submission failed");
            }

            // Show success state
            rfqForm.style.display = "none";
            if(rfqSuccess) rfqSuccess.style.display = "block";

        } catch(err) {
            showFormError(err.message || "Failed to submit RFQ. Please try again or email us directly.");
            if(submitBtn){ submitBtn.disabled = false; submitBtn.classList.remove("uploading"); submitBtn.textContent = "Submit Engineering RFQ"; }
        } finally {
            isSubmitting = false;
        }

    });

    // Clear errors on input
    rfqForm.querySelectorAll("input, select, textarea").forEach(function(field){

        field.addEventListener("input", function(){

            const err = this.parentElement.querySelector(".rfq-form-error");

            if(err) err.style.display = "none";

            this.style.borderColor = "";

        });

    });

}


// --- PVIS RESULT DISPLAY ENHANCEMENT ---

const _pvisBase = window.searchProduct;

window.searchProduct = function(category){

    _pvisBase(category);

    const resultBox = document.getElementById("product-results");

    if(!resultBox) return;

    if(resultBox.innerHTML.trim()){

        // Append RFQ link if not already present
        if(!resultBox.querySelector(".pvis-rfq-link")){

            const link      = document.createElement("a");
            link.href       = "contact.html";
            link.className  = "pvis-rfq-link";
            link.textContent= "Proceed to Engineering RFQ";
            resultBox.appendChild(link);

        }

        resultBox.style.display = "block";

        resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });

    }

};


});
