let business = JSON.parse(localStorage.getItem("business"));

if (business) {

document.getElementById("businessList").innerHTML = `
<h2>${business.businessName}</h2>

<p><b>Owner:</b> ${business.ownerName}</p>

<p><b>Phone:</b> ${business.phone}</p>

<p><b>Address:</b> ${business.address}</p>

<p><b>Category:</b> ${business.category}</p>

<hr>
`;

}else{

document.getElementById("businessList").innerHTML =
"<h3>No Business Found</h3>";

}
