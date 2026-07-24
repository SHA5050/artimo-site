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



});
