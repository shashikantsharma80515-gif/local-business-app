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
        businessName: businessName,
        ownerName: ownerName,
        phone: phone,
        address: address,
        category: category
    };

    let businesses = JSON.parse(localStorage.getItem("businesses")) || [];

    businesses.push(business);

    localStorage.setItem("businesses", JSON.stringify(businesses));

    // Test
    alert(localStorage.getItem("businesses"));

    alert("Business Saved Successfully ✅");

    // Form Clear
    document.getElementById("businessName").value = "";
    document.getElementById("ownerName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("category").selectedIndex = 0;
}
