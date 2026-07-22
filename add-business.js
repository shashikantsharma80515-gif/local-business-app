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
    let address = document.getElementById("address").value.trim();
    let category = document.getElementById("category").value;

    if (
        businessName === "" ||
        ownerName === "" ||
        phone === "" ||
        address === ""
    ) {
        alert("Please fill all fields!");
        return;
    }

    const btn = document.getElementById("addBtn");
    btn.disabled = true;
    btn.innerText = "Saving...";

    try {

        await addDoc(collection(db, "businesses"), {
            businessName: businessName,
            ownerName: ownerName,
            phone: phone,
            address: address,
            category: category,
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
