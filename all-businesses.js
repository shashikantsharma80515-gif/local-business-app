let businesses = JSON.parse(localStorage.getItem("businesses")) || [];

function displayBusinesses(list) {

    let output = "";

    if (list.length === 0) {
        output = "<h3 style='text-align:center;'>No Business Found 😔</h3>";
    } else {

        list.forEach(function (business, index) {

            if (!business.status) {
                business.status = "Pending";
            }

            output += `
            <div style="background:#fff;padding:15px;margin:15px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.1);">

                <h2>${business.businessName}</h2>

                <p><b>Owner:</b> ${business.ownerName}</p>

                <p><b>Phone:</b> ${business.phone}</p>

                <p><b>Address:</b> ${business.address}</p>

                <p><b>Category:</b> ${business.category}</p>

                <p><b>Status:</b> ${business.status}</p>

                <button onclick="approveBusiness(${index})">✅ Approve</button>

                <button onclick="rejectBusiness(${index})">❌ Reject</button>

                <button onclick="deleteBusiness(${index})">🗑 Delete</button>

            </div>
            `;
        });

    }

    document.getElementById("businessList").innerHTML = output;
}

displayBusinesses(businesses);

function approveBusiness(index) {

    businesses[index].status = "Approved";

    localStorage.setItem("businesses", JSON.stringify(businesses));

    alert("Business Approved ✅");

    displayBusinesses(businesses);
}

function rejectBusiness(index) {

    businesses[index].status = "Rejected";

    localStorage.setItem("businesses", JSON.stringify(businesses));

    alert("Business Rejected ❌");

    displayBusinesses(businesses);
}

function deleteBusiness(index) {

    if (confirm("Delete this business?")) {

        businesses.splice(index, 1);

        localStorage.setItem("businesses", JSON.stringify(businesses));

        alert("Business Deleted 🗑");

        displayBusinesses(businesses);
    }
}

function searchBusiness() {

    let text = document.getElementById("search").value.toLowerCase();

    let filtered = businesses.filter(function (business) {

        return (
            business.businessName.toLowerCase().includes(text) ||
            business.category.toLowerCase().includes(text) ||
            business.ownerName.toLowerCase().includes(text)
        );

    });

    displayBusinesses(filtered);
        }
