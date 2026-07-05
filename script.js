document.addEventListener("DOMContentLoaded", function () {
    console.log("Welcome to Sarmera Business Hub!");

    const searchBox = document.querySelector("input");

    searchBox.addEventListener("keyup", function () {
        console.log("Searching: " + searchBox.value);
    });
});
