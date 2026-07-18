function saveBusiness() {
    alert("Button Working ✅");
}
function saveBusiness() {

    let businessName = document.getElementById("businessName").value;
    let ownerName = document.getElementById("ownerName").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let category = document.getElementById("category").value;

    let business = {
        businessName: businessName,
        ownerName: ownerName,
        phone: phone,
        address: address,
        category: category
    };

    localStorage.setItem("business", JSON.stringify(business));

    alert("Business Saved Successfully ✅");
}
