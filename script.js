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
