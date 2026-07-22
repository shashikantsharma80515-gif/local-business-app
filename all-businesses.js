import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

let businesses = [];

async function loadBusinesses() {

    const q = query(
        collection(db, "businesses"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    businesses = [];

    snapshot.forEach((doc) => {

        businesses.push({
            id: doc.id,
            ...doc.data()
        });

    });

    displayBusinesses(businesses);

}

function displayBusinesses(list) {

    let output = "";

    if (list.length === 0) {

        output =
        "<h3 style='text-align:center;'>No Business Found 😔</h3>";

    } else {

        list.forEach(function(business){

            output += `

<div style="background:#fff;padding:15px;margin:15px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.1);">

<h2>${business.businessName}</h2>

<p><b>Owner:</b> ${business.ownerName}</p>

<p><b>Phone:</b> ${business.phone}</p>

<p><b>Address:</b> ${business.address}</p>

<p><b>Category:</b> ${business.category}</p>

<p><b>Status:</b> ${business.status}</p>

<button onclick="approveBusiness('${business.id}')">
✅ Approve
</button>

<button onclick="rejectBusiness('${business.id}')">
❌ Reject
</button>

<button onclick="deleteBusiness('${business.id}')">
🗑 Delete
</button>

</div>

`;

        });

    }

    document.getElementById("businessList").innerHTML = output;

}

function searchBusiness(){

    let text =
    document.getElementById("search").value.toLowerCase();

    let filtered = businesses.filter(function(business){

        return business.businessName.toLowerCase().includes(text)
        ||
        business.ownerName.toLowerCase().includes(text)
        ||
        business.category.toLowerCase().includes(text);

    });

    displayBusinesses(filtered);

}

document
.getElementById("search")
.addEventListener("keyup", searchBusiness);

loadBusinesses();
import {
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

window.approveBusiness = async function(id){

    await updateDoc(doc(db,"businesses",id),{
        status:"Approved"
    });

    alert("Business Approved ✅");

    loadBusinesses();
}

window.rejectBusiness = async function(id){

    await updateDoc(doc(db,"businesses",id),{
        status:"Rejected"
    });

    alert("Business Rejected ❌");

    loadBusinesses();
}

window.deleteBusiness = async function(id){

    if(confirm("Delete this business?")){

        await deleteDoc(doc(db,"businesses",id));

        alert("Business Deleted 🗑");

        loadBusinesses();
    }

}
