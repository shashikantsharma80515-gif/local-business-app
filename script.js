let businesses = JSON.parse(localStorage.getItem("businesses")) || [];

function showBusinesses(list) {

    let output = "";

    list.forEach(function(business, index) {

        if (business.status === "Approved") {

            output += `
            <div class="business" style="background:white;padding:15px;margin:15px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.1);">

                <h2>${business.businessName}</h2>

                <p><b>Owner:</b> ${business.ownerName}</p>

                <p>📞 ${business.phone}</p>

                <p>📍 ${business.address}</p>

                <p>📂 ${business.category}</p>

                <br>

                <button onclick="viewBusiness(${index})">
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

showBusinesses(businesses);

function searchBusiness() {

    let text = document.getElementById("search").value.toLowerCase();

    let filtered = businesses.filter(function(business) {

        return business.businessName.toLowerCase().includes(text) ||
               business.category.toLowerCase().includes(text);

    });

    showBusinesses(filtered);
}

function viewBusiness(index) {
    localStorage.setItem("selectedBusiness", index);
    window.location.href = "business.html";
}
