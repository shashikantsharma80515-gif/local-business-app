function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "123456") {
        alert("Login Successful ✅");
        window.location.href = "dashboard.html";
    } else {
        alert("Wrong Username or Password ❌");
    }
}
