function saveBusiness() {

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

    let business = {
        businessName,
        ownerName,
        phone,
        address,
        category
    };

    let businesses = JSON.parse(localStorage.getItem("businesses")) || [];

    businesses.push(business);

    localStorage.setItem("businesses", JSON.stringify(businesses));

    alert("Business Saved Successfully ✅");

    document.getElementById("businessName").value = "";
    document.getElementById("ownerName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("category").selectedIndex = 0;
}
