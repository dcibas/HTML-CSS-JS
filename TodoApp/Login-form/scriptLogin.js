let btn1 = document.getElementById("Back");

btn1.addEventListener("click", back);

function back(e) {
  e.preventDefault();
  window.location.href = "http://127.0.0.1:5500/Main/Main.html";
}

let btn2 = document.getElementById("Login");

btn2.addEventListener("click", login);

const togglePassword = document.querySelector("#togglePassword");

const password = document.querySelector("#password");

togglePassword.addEventListener("click", function (e) {
    e.preventDefault();
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("bi-eye");
});

function login(e) {
  e.preventDefault();
  let myemail = document.getElementById("email").value;
  let mypassword = document.getElementById("password").value;
  let token = "";
  fetch("http://localhost:8090/api/auth/login",
  {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        password: mypassword,
        email: myemail,
      }),
  })
    .then((res) => {
      token = res.headers.get("Authorization")
      localStorage.setItem("token", token);
      res.json()
    .then((data) =>  {
        if (token != null && token != "") {
          localStorage.setItem("user", JSON.stringify({ myemail, mypassword })); 
          localStorage.setItem("userid", data.id);
          alert("Login successful!");
          window.location = "http://127.0.0.1:5500/Todo-app/Todo-app.html";
        }
        else
        {
        alert("Invalid email or password. Please try again!");
        document.getElementById("error").textContent =
          "Invalid email or password. Please try again!";
      }
    
    });
  
})}
