function saveBusiness() {

    let businessName = document.getElementById("businessName").value.trim();
    let ownerName = document.getElementById("ownerName").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();
    let category = document.getElementById("category").value;

    if (businessName === "" || ownerName === "" || phone === "" || address === "") {
        alert("Please fill all fields!");
        return;
    }

    let businesses = JSON.parse(localStorage.getItem("businesses")) || [];

    businesses.push({
        businessName,
        ownerName,
        phone,
        address,
        category,
        status: "Pending"
    });

    localStorage.setItem("businesses", JSON.stringify(businesses));

    alert("Business Saved Successfully ✅");

    window.location.href = "all-businesses.html";
}
