import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

async function saveBusiness() {

    let businessName = document.getElementById("businessName").value.trim();
    let ownerName = document.getElementById("ownerName").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let address = document.getElementById("address").value.trim();
    let mapLink = document.getElementById("mapLink").value.trim();
    let website = document.getElementById("website").value.trim();
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value.trim();

    if (
        businessName === "" ||
        ownerName === "" ||
        phone === "" ||
        address === ""
    ) {
        alert("Please fill all required fields!");
        return;
    }

    const btn = document.getElementById("addBtn");
    btn.disabled = true;
    btn.innerText = "Saving...";

    try {

        await addDoc(collection(db, "businesses"), {

            businessName,
            ownerName,
            phone,
            email,
            address,
            mapLink,
            website,
            category,
            description,

            status: "Pending",

            createdAt: serverTimestamp()

        });

        alert("Business Saved Successfully ✅");

        window.location.href = "all-businesses.html";

    } catch (error) {

        alert("Error: " + error.message);

        btn.disabled = false;
        btn.innerText = "➕ Add Business";
    }

}

document.getElementById("addBtn").addEventListener("click", saveBusiness);
