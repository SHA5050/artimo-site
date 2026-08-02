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

            "Stud Bolt",

            "Socket Screw",

            "Eye Bolt",

            "U-Bolt"

        ]

    },


    nuts:{

        name:"Nuts",

        items:[

            "Hex Nut",

            "Heavy Hex Nut",

            "Lock Nut",

            "Square Nut"

        ]

    },


    washers:{

        name:"Washers",

        items:[

            "Flat Washer",

            "Spring Washer",

            "Lock Washer",

            "Nord-Lock System"

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
        { field: "standard",   label: "Standard / Specification", placeholder: "e.g. DIN 933, ISO 4014, ASTM A325" },
        { field: "material",   label: "Material Grade",           placeholder: "e.g. 8.8, 10.9, A325, 316 SS" },
        { field: "dimensions", label: "Diameter & Length",        placeholder: "e.g. M20 x 80mm / 3/4\" x 3\"" },
        { field: "quantity",    label: "Quantity",                 placeholder: "e.g. 500 pcs" },
        { field: "notes",       label: "Additional Requirements", placeholder: "Coating, inspection standards, drawings reference...", type: "textarea" }
    ],

    "Heavy Hex Bolt": [
        { field: "standard",   label: "Standard / Specification", placeholder: "e.g. ASTM A193 B7, A490, DIN 6914" },
        { field: "material",   label: "Material Grade",           placeholder: "e.g. A193 B7, B8M, 2H, 10.9" },
        { field: "dimensions", label: "Diameter & Length",        placeholder: "e.g. M24 x 100mm / 1\" x 4\"" },
        { field: "quantity",    label: "Quantity",                 placeholder: "e.g. 200 pcs" },
        { field: "notes",       label: "Additional Requirements", placeholder: "Coating, temperature range, application details...", type: "textarea" }
    ],

    "Stud Bolt": [
        { field: "standard",   label: "Standard / Specification", placeholder: "e.g. ASTM A193 B7, B8, B8M" },
        { field: "material",   label: "Material Grade",           placeholder: "e.g. B7, B8 Class 2, B8M" },
        { field: "dimensions", label: "Diameter & Length",        placeholder: "e.g. 5/8\" x 3-1/2\" (full thread)" },
        { field: "quantity",    label: "Quantity",                 placeholder: "e.g. 100 sets" },
        { field: "notes",       label: "Additional Requirements", placeholder: "Nut type (heavy hex), coating (PTFE/HDG), flange facing...", type: "textarea" }
    ],

    "Socket Screw": [
        { field: "standard",   label: "Standard / Specification", placeholder: "e.g. DIN 912, ISO 4762, ASTM A574" },
        { field: "material",   label: "Material Grade",           placeholder: "e.g. 12.9, A2-70, A4-80" },
        { field: "dimensions", label: "Diameter & Length",        placeholder: "e.g. M10 x 40mm / 3/8\" x 1-1/2\"" },
        { field: "quantity",    label: "Quantity",                 placeholder: "e.g. 1000 pcs" },
        { field: "notes",       label: "Additional Requirements", placeholder: "Head type (button head, flat head), coating...", type: "textarea" }
    ],

    "Hex Nut": [
        { field: "standard",   label: "Standard / Specification", placeholder: "e.g. DIN 934, ISO 4032, ASTM A563" },
        { field: "material",   label: "Material Grade",           placeholder: "e.g. 8, 10, A563 Grade B, 316 SS" },
        { field: "dimensions", label: "Nominal Diameter",        placeholder: "e.g. M20 / 3/4\"" },
        { field: "quantity",    label: "Quantity",                 placeholder: "e.g. 500 pcs" },
        { field: "notes",       label: "Additional Requirements", placeholder: "Coating, locking feature, application...", type: "textarea" }
    ],

    "Heavy Hex Nut": [
        { field: "standard",   label: "Standard / Specification", placeholder: "e.g. ASTM A194 2H, 7M, DIN 6915" },
        { field: "material",   label: "Material Grade",           placeholder: "e.g. 2H, 7M, 7, 316 SS" },
        { field: "dimensions", label: "Nominal Diameter",        placeholder: "e.g. M24 / 1\"" },
        { field: "quantity",    label: "Quantity",                 placeholder: "e.g. 200 pcs" },
        { field: "notes",       label: "Additional Requirements", placeholder: "Coating, temperature rating, matching stud spec...", type: "textarea" }
    ],

    "Lock Nut": [
        { field: "standard",   label: "Standard / Specification", placeholder: "e.g. DIN 985, ISO 10511, IFI-100" },
        { field: "material",   label: "Material Grade",           placeholder: "e.g. 8, A2-70, 316 SS" },
        { field: "dimensions", label: "Nominal Diameter",        placeholder: "e.g. M16 / 5/8\"" },
        { field: "quantity",    label: "Quantity",                 placeholder: "e.g. 500 pcs" },
        { field: "notes",       label: "Additional Requirements", placeholder: "Locking type (nylon insert, all-metal, prevailing torque)...", type: "textarea" }
    ],

    "Flat Washer": [
        { field: "standard",   label: "Standard / Specification", placeholder: "e.g. DIN 125, ISO 7089, ASTM F436" },
        { field: "material",   label: "Material Grade",           placeholder: "e.g. 100HV, 300HV, 316 SS, F436" },
        { field: "dimensions", label: "Nominal Diameter",        placeholder: "e.g. M20 / 3/4\"" },
        { field: "quantity",    label: "Quantity",                 placeholder: "e.g. 1000 pcs" },
        { field: "notes",       label: "Additional Requirements", placeholder: "Thickness, surface finish, hardness requirement...", type: "textarea" }
    ],

    "Spring Washer": [
        { field: "standard",   label: "Standard / Specification", placeholder: "e.g. DIN 127, DIN 128, ISO 10673" },
        { field: "material",   label: "Material Grade",           placeholder: "e.g. Spring Steel, 65Mn, 316 SS" },
        { field: "dimensions", label: "Nominal Diameter",        placeholder: "e.g. M16 / 5/8\"" },
        { field: "quantity",    label: "Quantity",                 placeholder: "e.g. 1000 pcs" },
        { field: "notes",       label: "Additional Requirements", placeholder: "Single coil / double coil, surface treatment...", type: "textarea" }
    ],

    "Nord-Lock System": [
        { field: "standard",   label: "Standard / Specification", placeholder: "e.g. Nord-Lock NLSC, NLSP series" },
        { field: "material",   label: "Material Grade",           placeholder: "e.g. 316 SS, 254 SMO, Inconel" },
        { field: "dimensions", label: "Nominal Diameter",        placeholder: "e.g. M20 / 3/4\"" },
        { field: "quantity",    label: "Quantity",                 placeholder: "e.g. 500 sets" },
        { field: "notes",       label: "Additional Requirements", placeholder: "Paired with bolt/nut spec, application environment...", type: "textarea" }
    ],

    "Special Fastener": [
        { field: "standard",   label: "Standard / Specification", placeholder: "e.g. Custom drawing, proprietary spec" },
        { field: "material",   label: "Material Grade",           placeholder: "e.g. As specified on drawing" },
        { field: "dimensions", label: "Critical Dimensions",      placeholder: "e.g. Per drawing / as specified" },
        { field: "quantity",    label: "Quantity",                 placeholder: "e.g. 50 pcs" },
        { field: "notes",       label: "Engineering Details",      placeholder: "Drawing reference, application, load requirements, testing specs...", type: "textarea" }
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

const rfqForm    = document.getElementById("amos-rfq-form");
const rfqSuccess = document.getElementById("rfq-success");

if(rfqForm){

    rfqForm.addEventListener("submit", function(e){

        e.preventDefault();

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

        // Build structured RFQ payload (data-amos-field attributes — AMOS pipeline ready)
        const payload = {
            company:      rfqForm.querySelector("[data-amos-field='company']").value,
            email:        rfqForm.querySelector("[data-amos-field='email']").value,
            productType:  rfqForm.querySelector("[data-amos-field='product-type']").value,
            standard:     rfqForm.querySelector("[data-amos-field='standard']").value  || "Not specified",
            material:     rfqForm.querySelector("[data-amos-field='material']").value  || "Not specified",
            dimensions:   rfqForm.querySelector("[data-amos-field='dimensions']").value|| "Not specified",
            quantity:     rfqForm.querySelector("[data-amos-field='quantity']").value  || "Not specified",
            notes:        rfqForm.querySelector("[data-amos-field='notes']").value     || "None"
        };

        const subject = "ARTIMO Engineering RFQ \u2014 " + payload.productType + " \u2014 " + payload.company;

        const body =
            "ARTIMO ENGINEERING RFQ\n" +
            "========================\n\n" +
            "Company / Name:        " + payload.company     + "\n" +
            "Email:                 " + payload.email       + "\n" +
            "Product Type:          " + payload.productType + "\n" +
            "Standard:              " + payload.standard    + "\n" +
            "Material Grade:        " + payload.material    + "\n" +
            "Diameter & Length:     " + payload.dimensions  + "\n" +
            "Quantity:              " + payload.quantity    + "\n\n" +
            "Additional Requirements:\n" + payload.notes    + "\n\n" +
            "------------------------\n" +
            "Submitted via ARTIMO Engineering RFQ System";

        window.location.href =
            "mailto:artimo.engineering@gmail.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body="    + encodeURIComponent(body);

        // Show success state
        rfqForm.style.display = "none";

        if(rfqSuccess) rfqSuccess.style.display = "block";

        console.log("ARTIMO AMOS RFQ Payload:", payload);

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
