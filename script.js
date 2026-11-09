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

    },


    special:{

        name:"Special Fasteners",

        items:[

            "Special Fastener"

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


// --- MULTI-PRODUCT RFQ SYSTEM ---

const PRODUCT_OPTIONS = [
    { value: "Stud Bolt",        label: "Stud Bolt" },
    { value: "Heavy Hex Bolt",   label: "Heavy Hex Bolt" },
    { value: "Hex Bolt",         label: "Hex Bolt" },
    { value: "Heavy Hex Nut",    label: "Heavy Hex Nut" },
    { value: "Hex Nut",          label: "Hex Nut" },
    { value: "Anchor Bolt",      label: "Anchor Bolt" },
    { value: "U-Bolt",           label: "U-Bolt" },
    { value: "Flat Washer",      label: "Flat Washer" },
    { value: "Spring Washer",    label: "Spring Washer" },
    { value: "Lock Nut",         label: "Lock Nut" },
    { value: "Socket Screw",     label: "Socket Screw" },
    { value: "Special Fastener", label: "Special Fastener — Engineering Review Required" }
];

var productsContainer = document.getElementById("rfq-products-container");
var addProductBtn = document.getElementById("rfq-add-product");
var productCounter = 0;

function buildProductOptionsHTML(selectedValue){
    var html = '<option value="">Select product type...</option>';
    for(var i = 0; i < PRODUCT_OPTIONS.length; i++){
        var opt = PRODUCT_OPTIONS[i];
        var sel = opt.value === selectedValue ? " selected" : "";
        html += '<option value="' + opt.value + '"' + sel + '>' + opt.label + '</option>';
    }
    return html;
}

function renderEngineeringFields(productIndex, productType){
    var container = document.getElementById("rfq-eng-fields-" + productIndex);
    if(!container) return;

    if(!productType){
        container.innerHTML = '<p class="rfq-schema-hint">Select a product type to load the corresponding engineering fields.</p>';
        return;
    }

    var schema = engineeringSchemas[productType];
    if(!schema){
        container.innerHTML = '<p class="rfq-schema-hint">Select a product type to load the corresponding engineering fields.</p>';
        return;
    }

    var html = '<p class="rfq-schema-label">Engineering Specification — ' + productType + '</p>';

    for(var i = 0; i < schema.length; i++){
        var field = schema[i];
        var fieldId = "rfq-p" + productIndex + "-" + field.field;

        if(field.field === "quantity") continue;

        if(i < schema.length - 1 && schema[i + 1].field !== "quantity"){
            var field2 = schema[i + 1];
            var fieldId2 = "rfq-p" + productIndex + "-" + field2.field;

            html += '<div class="rfq-form-row">';
            html += '  <div class="rfq-form-group">';
            html += '    <label for="' + fieldId + '">' + field.label + '</label>';
            html += '    <input type="text" id="' + fieldId + '" data-eng-field="' + field.field + '" placeholder="' + field.placeholder + '">';
            html += '  </div>';
            html += '  <div class="rfq-form-group">';
            html += '    <label for="' + fieldId2 + '">' + field2.label + '</label>';
            html += '    <input type="text" id="' + fieldId2 + '" data-eng-field="' + field2.field + '" placeholder="' + field2.placeholder + '">';
            html += '  </div>';
            html += '</div>';
            i++;
        } else {
            html += '<div class="rfq-form-group">';
            html += '  <label for="' + fieldId + '">' + field.label + '</label>';
            html += '  <input type="text" id="' + fieldId + '" data-eng-field="' + field.field + '" placeholder="' + field.placeholder + '">';
            html += '</div>';
        }
    }

    container.innerHTML = html;

    container.querySelectorAll("input, textarea").forEach(function(newField){
        newField.addEventListener("input", function(){
            this.style.borderColor = "";
        });
    });
}

function createProductBlock(){
    productCounter++;
    var idx = productCounter;

    var block = document.createElement("div");
    block.className = "rfq-product-block";

    var header = document.createElement("div");
    header.className = "rfq-product-header";

    var title = document.createElement("span");
    title.className = "rfq-product-title";
    title.textContent = "Product " + idx;
    header.appendChild(title);

    if(idx > 1){
        var removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "rfq-product-remove";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", function(){
            block.remove();
            renumberProducts();
        });
        header.appendChild(removeBtn);
    }

    block.appendChild(header);

    var typeGroup = document.createElement("div");
    typeGroup.className = "rfq-form-group";
    var typeLabel = document.createElement("label");
    typeLabel.textContent = "Product Type *";
    var typeSelect = document.createElement("select");
    typeSelect.dataset.productType = "true";
    typeSelect.innerHTML = buildProductOptionsHTML("");
    typeSelect.addEventListener("change", function(){
        renderEngineeringFields(idx, this.value);
        if(this.value){
            this.style.borderColor = "";
            var err = this.parentElement.querySelector(".rfq-form-error");
            if(err) err.style.display = "none";
        }
    });
    var typeError = document.createElement("span");
    typeError.className = "rfq-form-error";
    typeError.textContent = "Please select a product type.";
    typeGroup.appendChild(typeLabel);
    typeGroup.appendChild(typeSelect);
    typeGroup.appendChild(typeError);
    block.appendChild(typeGroup);

    var qtyGroup = document.createElement("div");
    qtyGroup.className = "rfq-form-group";
    var qtyLabel = document.createElement("label");
    qtyLabel.textContent = "Quantity *";
    var qtyInput = document.createElement("input");
    qtyInput.type = "text";
    qtyInput.dataset.productQty = "true";
    qtyInput.placeholder = "e.g. 100 pcs";
    qtyInput.addEventListener("input", function(){
        this.style.borderColor = "";
        var err = this.parentElement.querySelector(".rfq-form-error");
        if(err) err.style.display = "none";
    });
    var qtyError = document.createElement("span");
    qtyError.className = "rfq-form-error";
    qtyError.textContent = "Quantity is required.";
    qtyGroup.appendChild(qtyLabel);
    qtyGroup.appendChild(qtyInput);
    qtyGroup.appendChild(qtyError);
    block.appendChild(qtyGroup);

    var engDiv = document.createElement("div");
    engDiv.id = "rfq-eng-fields-" + idx;
    engDiv.className = "rfq-eng-fields";
    engDiv.innerHTML = '<p class="rfq-schema-hint">Select a product type to load the corresponding engineering fields.</p>';
    block.appendChild(engDiv);

    return block;
}

function renumberProducts(){
    if(!productsContainer) return;
    var blocks = productsContainer.querySelectorAll(".rfq-product-block");
    blocks.forEach(function(block, i){
        var title = block.querySelector(".rfq-product-title");
        if(title) title.textContent = "Product " + (i + 1);
    });
}

if(productsContainer){
    productsContainer.appendChild(createProductBlock());
}

if(addProductBtn){
    addProductBtn.addEventListener("click", function(){
        if(productsContainer){
            productsContainer.appendChild(createProductBlock());
            var newBlock = productsContainer.lastElementChild;
            if(newBlock){
                newBlock.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }
    });
}


// --- TODAY BUTTON FOR DELIVERY DATE ---

var todayBtn = document.getElementById("rfq-delivery-today");
var deliveryInput = document.getElementById("rfq-delivery");

if(todayBtn && deliveryInput){
    todayBtn.addEventListener("click", function(){
        var now = new Date();
        var y = now.getFullYear();
        var m = String(now.getMonth() + 1).padStart(2, "0");
        var d = String(now.getDate()).padStart(2, "0");
        deliveryInput.value = y + "-" + m + "-" + d;
    });
}


// --- RFQ FORM HANDLER (AMOS-compatible frontend) ---

const SUPABASE_URL = "https://kjyxfacwhrthzwaxyemc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJreXhmYWN3aHJ0aHp3YXh5ZW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0NjM4NjksImV4cCI6MjEwMjAzOTg2OX0.W7avSv-nOPw5DQY92TqSCmOfIoWec7rBX_ByqnJgu1E";
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

        // Required field validation (static top-level fields)
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

        // Validate each product block: product type + quantity required
        if(productsContainer){
            productsContainer.querySelectorAll(".rfq-product-block").forEach(function(block){
                var typeSelect = block.querySelector("[data-product-type]");
                var qtyInput = block.querySelector("[data-product-qty]");

                if(typeSelect && !typeSelect.value.trim()){
                    var err = typeSelect.parentElement.querySelector(".rfq-form-error");
                    if(err) err.style.display = "block";
                    typeSelect.style.borderColor = "#ff8888";
                    valid = false;
                }

                if(qtyInput && !qtyInput.value.trim()){
                    var err = qtyInput.parentElement.querySelector(".rfq-form-error");
                    if(err) err.style.display = "block";
                    qtyInput.style.borderColor = "#ff8888";
                    valid = false;
                }
            });
        }

        if(!valid) return;

        // --- MULTI-PRODUCT DATA COLLECTION ---

        var productBlocks = productsContainer ? productsContainer.querySelectorAll(".rfq-product-block") : [];
        var products = [];
        var firstProductType = "";

        productBlocks.forEach(function(block, i){
            var typeSelect = block.querySelector("[data-product-type]");
            var qtyInput = block.querySelector("[data-product-qty]");
            var engContainer = block.querySelector(".rfq-eng-fields");

            var pType = typeSelect ? typeSelect.value.trim() : "";
            var pQty = qtyInput ? qtyInput.value.trim() : "";

            if(i === 0) firstProductType = pType;

            var engData = {};
            if(engContainer){
                engContainer.querySelectorAll("input, textarea, select").forEach(function(f){
                    var key = f.getAttribute("data-eng-field");
                    if(key) engData[key] = f.value || "";
                });
            }

            products.push({
                product_type: pType,
                quantity: pQty,
                engineering: engData
            });
        });

        // Collect static top-level fields
        var company     = rfqForm.querySelector("[data-amos-field='company']").value;
        var contactName = rfqForm.querySelector("[data-amos-field='contact-name']").value;
        var countryVal  = rfqForm.querySelector("[data-amos-field='country']").value;
        var phoneVal    = rfqForm.querySelector("[data-amos-field='phone']").value;
        var email       = rfqForm.querySelector("[data-amos-field='email']").value;
        var industry    = rfqForm.querySelector("[data-amos-field='industry']").value;
        var application = rfqForm.querySelector("[data-amos-field='application']").value;
        var deliveryDate= rfqForm.querySelector("[data-amos-field='delivery-date']").value;

        // Build engineering_data: top-level fields + products array
        var engineeringData = {};
        if(countryVal)  engineeringData.country = countryVal;
        if(phoneVal)    engineeringData.phone = phoneVal;
        if(industry)    engineeringData.industry = industry;
        if(application) engineeringData.application = application;
        if(deliveryDate) engineeringData.delivery_date = deliveryDate;
        engineeringData.products = products;

        // Collect notes
        var notesField = rfqForm.querySelector("[data-amos-field='notes']");
        var notesValue = notesField ? notesField.value : "";

        // Build multipart form data — preserve existing endpoint contract
        var formData = new FormData();
        formData.append("product_type", firstProductType || "");
        formData.append("company_name", company);
        formData.append("contact_name", contactName || "");
        formData.append("email", email);
        formData.append("engineering_data", JSON.stringify(engineeringData));
        formData.append("notes", notesValue);

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

    // Clear errors on input (static fields)
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
