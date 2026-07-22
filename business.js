import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

async function loadBusiness() {

    const id = localStorage.getItem("selectedBusiness");

    if (!id) {

        document.getElementById("businessDetails").innerHTML =
        "<h3 style='text-align:center;'>Business Not Found 😔</h3>";

        return;
    }

    try {

        const docRef = doc(db, "businesses", id);

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {

            document.getElementById("businessDetails").innerHTML =
            "<h3 style='text-align:center;'>Business Not Found 😔</h3>";

            return;
        }

        const business = docSnap.data();

        document.getElementById("businessDetails").innerHTML = `

        <div class="card">

        <h2>${business.businessName}</h2>

        <p><b>👤 Owner:</b> ${business.ownerName}</p>

        <p><b>📞 Phone:</b> ${business.phone}</p>

        <p><b>📍 Address:</b> ${business.address}</p>

        <p><b>📂 Category:</b> ${business.category}</p>

        <p><b>✅ Status:</b> ${business.status}</p>

        <a href="tel:${business.phone}">
        <button>📞 Call Now</button>
        </a>

        <a href="https://wa.me/91${business.phone}" target="_blank">
        <button>💬 WhatsApp</button>
        </a>

        <button class="back" onclick="history.back()">
        ⬅ Back
        </button>

        </div>

        `;

    } catch (error) {

        document.getElementById("businessDetails").innerHTML =
        "<h3 style='text-align:center;'>Error Loading Business ❌</h3>";

    }

}

loadBusiness();
