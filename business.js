let businesses = JSON.parse(localStorage.getItem("businesses")) || [];

let index = localStorage.getItem("selectedBusiness");

let business = businesses[index];

if (!business) {
    document.getElementById("businessDetails").innerHTML =
        "<h2 style='padding:20px;'>Business Not Found 😔</h2>";
} else {

    document.getElementById("businessDetails").innerHTML = `
        <div style="background:white;padding:20px;margin:20px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.1);">

            <h2>${business.businessName}</h2>

            <p><b>Owner:</b> ${business.ownerName}</p>

            <p><b>Phone:</b> ${business.phone}</p>

            <p><b>Address:</b> ${business.address}</p>

            <p><b>Category:</b> ${business.category}</p>

            <br>

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
