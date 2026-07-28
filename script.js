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

    snapshot.forEach((docSnap) => {
      businesses.push({
        id: docSnap.id,
        ...docSnap.data()
      });
    });

    showBusinesses(businesses);

  } catch (error) {
    console.error(error);
    document.getElementById("businessList").innerHTML =
      "<h3>Error Loading Businesses ❌</h3>";
  }
}

function showBusinesses(list) {

  const businessList = document.getElementById("businessList");
  businessList.innerHTML = "";

  let approved = list.filter(
    b => (b.status || "").trim().toLowerCase() === "approved"
  );

  if (approved.length === 0) {
    businessList.innerHTML =
      "<h3 style='text-align:center'>No Approved Businesses Yet 😔</h3>";
    return;
  }

  approved.forEach((business) => {

    const div = document.createElement("div");

    div.className = "business";

    div.style.background = "#fff";
    div.style.padding = "15px";
    div.style.margin = "15px";
    div.style.borderRadius = "12px";
    div.style.boxShadow = "0 2px 8px rgba(0,0,0,.1)";

    div.innerHTML = `
      <h2>🏪 ${business.businessName || ""}</h2>

      ${business.image ? `
      <img src="${business.image}"
      style="width:100%;height:220px;object-fit:cover;border-radius:10px;">
      ` : ""}

      <p><b>👤 Owner:</b> ${business.ownerName || ""}</p>

      <p>📞 ${business.phone || ""}</p>

      <p>📧 ${business.email || "Not Available"}</p>

      <p>📍 ${business.address || ""}</p>

      <p>📂 ${business.category || ""}</p>

      <p>${business.description || ""}</p>

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
    `;

    if (business.mapLink) {
      div.innerHTML += `
      <br><br>
      <a href="${business.mapLink}" target="_blank">
      <button>🗺️ Google Maps</button>
      </a>`;
    }

    if (business.website) {
      div.innerHTML += `
      <br><br>
      <a href="${business.website}" target="_blank">
      <button>🌐 Website</button>
      </a>`;
    }

    businessList.appendChild(div);

  });

}

function searchBusiness() {

  const text = document.getElementById("search").value.toLowerCase();

  const filtered = businesses.filter((business) => {

    return (
      (business.businessName || "").toLowerCase().includes(text) ||
      (business.ownerName || "").toLowerCase().includes(text) ||
      (business.category || "").toLowerCase().includes(text)
    );

  });

  showBusinesses(filtered);

}

document.getElementById("search").addEventListener("keyup", searchBusiness);

window.viewBusiness = function(id) {
  localStorage.setItem("selectedBusiness", id);
  window.location.href = "business.html";
};

loadBusinesses();
