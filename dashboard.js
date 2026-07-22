import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

async function loadDashboard() {

    let total = 0;
    let approved = 0;
    let pending = 0;
    let rejected = 0;

    const snapshot = await getDocs(collection(db, "businesses"));

    snapshot.forEach((doc) => {

        total++;

        const business = doc.data();

        if (business.status === "Approved") {
            approved++;
        }
        else if (business.status === "Rejected") {
            rejected++;
        }
        else {
            pending++;
        }

    });

    document.getElementById("stats").innerHTML = `

    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px;">

        <div style="background:#0d6efd;color:white;padding:18px;border-radius:15px;text-align:center;">
            <h2>${total}</h2>
            <p>📋 Total Businesses</p>
        </div>

        <div style="background:#198754;color:white;padding:18px;border-radius:15px;text-align:center;">
            <h2>${approved}</h2>
            <p>✅ Approved</p>
        </div>

        <div style="background:#ffc107;color:black;padding:18px;border-radius:15px;text-align:center;">
            <h2>${pending}</h2>
            <p>⏳ Pending</p>
        </div>

        <div style="background:#dc3545;color:white;padding:18px;border-radius:15px;text-align:center;">
            <h2>${rejected}</h2>
            <p>❌ Rejected</p>
        </div>

    </div>

    `;

}

loadDashboard();
