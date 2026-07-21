import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

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

    try {

        await addDoc(collection(db, "businesses"), {
            businessName,
            ownerName,
            phone,
            address,
            category,
            status: "Pending",
            createdAt: new Date()
        });

        alert("Business Saved Successfully ✅");

        window.location.href = "all-businesses.html";

    } catch (error) {

        alert("Error: " + error.message);

    }

}

document.getElementById("addBtn").addEventListener("click", saveBusiness);
