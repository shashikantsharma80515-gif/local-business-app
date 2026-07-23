import { db } from "./firebase.js";
alert("JavaScript Loaded");
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Cloudinary Details
const CLOUD_NAME = "rmjdpxfu";
const UPLOAD_PRESET = "sarmera_business";

async function saveBusiness() {

  const businessName = document.getElementById("businessName").value.trim();
  const ownerName = document.getElementById("ownerName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const mapLink = document.getElementById("mapLink").value.trim();
  const website = document.getElementById("website").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();

  // HTML me id="businessImage" hai
  const imageFile = document.getElementById("businessImage").files[0];

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

    let imageUrl = "";

    if (imageFile) {

      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Image upload failed");
      }

      imageUrl = data.secure_url;
    }

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
      image: imageUrl,
      status: "Pending",
      createdAt: serverTimestamp()
    });

    alert("Business Saved Successfully ✅");

    window.location.href = "all-businesses.html";

  } catch (error) {

    alert("Error: " + error.message);

    console.error(error);

    btn.disabled = false;
    btn.innerText = "➕ Add Business";
  }

}

document.getElementById("addBtn").addEventListener("click", saveBusiness);
