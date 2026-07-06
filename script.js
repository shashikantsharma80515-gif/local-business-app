document.addEventListener("DOMContentLoaded", function () {
    console.log("Welcome to Sarmera Business Hub!");

    const searchBox = document.querySelector("input");

    searchBox.addEventListener("keyup", function () {
        console.log("Searching: " + searchBox.value);
    });
});
const searchInput = document.querySelector("input");
const businesses = document.querySelectorAll(".business");

searchInput.addEventListener("keyup", function () {
  const value = searchInput.value.toLowerCase();

  businesses.forEach(function (business) {
    if (business.innerText.toLowerCase().includes(value)) {
      business.style.display = "block";
    } else {
      business.style.display = "none";
    }
  });
});
