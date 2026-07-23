import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

let businesses = [];

async function loadBusinesses() {

    try {

        const snapshot = await getDocs(collection(db, "businesses"));

        businesses = [];

        snapshot.forEach((doc) => {

            businesses.push({
                id: doc.id,
                ...doc.data()
            });

        });

        showBusinesses(businesses);

    } catch (error) {

        document.getElementById("businessList").innerHTML =
        "<h3 style='text-align:center;'>Error Loading Businesses ❌</h3>";

    }

}

function showBusinesses(list) {

    let output = "";

    list.forEach(function (business) {

        if (business.status === "Approved") {

            output += `

<div class="business" style="background:white;padding:15px;margin:15px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.1);">

<h2>🏪 ${business.businessName}</h2>

<p><b>👤 Owner:</b> ${business.ownerName}</p>

<p><b>📞</b> ${business.phone}</p>

<p><b>📧</b> ${business.email || "Not Available"}</p>

<p><b>📍</b> ${business.address}</p>

<p><b>📂</b> ${business.category}</p>

<p><b>📝</b> ${business.description || "No Description"}</p>

<br>

<button onclick="viewBusiness('${business.id}')">
👀 View Details
</button>

<br><br>

<a href="tel:${business.phone}">
<button>📞 Call</button>
</a>

<br><br>

<a href="https://wa.me/91${business.phone}" target="_blank">
<button>💬 WhatsApp</button>
</a>

${
business.mapLink
? `<br><br>
<a href="${business.mapLink}" target="_blank">
<button>🗺️ Google Maps</button>
</a>`
: ""
}

${
business.website
? `<br><br>
<a href="${business.website}" target="_blank">
<button>🌐 Website</button>
</a>`
: ""
}

</div>

`;

        }

    });

    if (output === "") {

        output = "<h3 style='text-align:center;'>No Approved Businesses Yet 😔</h3>";

    }

    document.getElementById("businessList").innerHTML = output;

}

function searchBusiness() {

    let text = document.getElementById("search").value.toLowerCase();

    let filtered = businesses.filter(function(business){

        return (
            business.businessName.toLowerCase().includes(text) ||
            business.ownerName.toLowerCase().includes(text) ||
            business.category.toLowerCase().includes(text)
        );

    });

    showBusinesses(filtered);

}

document
.getElementById("search")
.addEventListener("keyup", searchBusiness);

window.viewBusiness = function(id){

    localStorage.setItem("selectedBusiness", id);

    window.location.href = "business.html";

}

loadBusinesses();
