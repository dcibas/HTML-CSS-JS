let btn1 = document.getElementById("Register");

btn1.addEventListener("click", register);

function register(e) {
  e.preventDefault();
  window.location =
    "http://127.0.0.1:5500/Registration-form/Registration-form.html";
}

let btn2 = document.getElementById("Login");

btn2.addEventListener("click", login);

function login(e) {
  e.preventDefault();
  window.location = "http://127.0.0.1:5500/Login-form/Login-form.html";
}
