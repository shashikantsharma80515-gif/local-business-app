import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

let businesses = [];

async function loadBusinesses() {

  const snapshot = await getDocs(collection(db, "businesses"));

  businesses = [];

  snapshot.forEach((doc) => {
    businesses.push({
      id: doc.id,
      ...doc.data()
    });
  });

  showBusinesses(businesses);
}

function showBusinesses(list) {

  let output = "";

  list.forEach(function (business) {

    if (business.status === "Approved") {

      output += `
      <div class="business" style="background:white;padding:15px;margin:15px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.1);">

      <h2>${business.businessName}</h2>

      <p><b>Owner:</b> ${business.ownerName}</p>

      <p>📞 ${business.phone}</p>

      <p>📍 ${business.address}</p>

      <p>📂 ${business.category}</p>

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

      </div>
      `;
    }

  });

  if (output === "") {
    output = "<h3 style='padding:15px;'>No Approved Businesses Yet 😔</h3>";
  }

  document.getElementById("businessList").innerHTML = output;
}

function searchBusiness() {

  let text = document.getElementById("search").value.toLowerCase();

  let filtered = businesses.filter(business =>
    business.businessName.toLowerCase().includes(text) ||
    business.category.toLowerCase().includes(text)
  );

  showBusinesses(filtered);
}

window.searchBusiness = searchBusiness;

window.viewBusiness = function(id){
  localStorage.setItem("selectedBusiness", id);
  window.location.href = "business.html";
}

loadBusinesses();
