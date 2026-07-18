let businesses = JSON.parse(localStorage.getItem("businesses")) || [];

let output = "";

if (businesses.length === 0) {
    output = "<h3>No Business Found 😔</h3>";
} else {
    businesses.forEach(function(business, index) {
        output += `
        <div style="background:white;padding:15px;margin:15px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.1);">
            <h2>${business.businessName}</h2>
            <p><b>Owner:</b> ${business.ownerName}</p>
            <p><b>Phone:</b> ${business.phone}</p>
            <p><b>Address:</b> ${business.address}</p>
            <p><b>Category:</b> ${business.category}</p>
        </div>
        `;
    });
}

document.getElementById("businessList").innerHTML = output;
