let btn1 = document.getElementById("Login");

btn1.addEventListener("click", loginpage);

function loginpage(e) {
  e.preventDefault();
  window.location.href = "http://127.0.0.1:5500/Login%20Form/VoteApp-Login.html";
}

const togglePassword = document.querySelector("#togglePassword1");

const password = document.querySelector("#password");

togglePassword.addEventListener("click", function (e) {
    e.preventDefault();
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("bi-eye");
});

const toggleRepeatPassword = document.querySelector("#togglePassword2");

const RepeatPassword = document.querySelector("#repeatpassword");

toggleRepeatPassword.addEventListener("click", function (e) {
    e.preventDefault();
    const type = RepeatPassword.getAttribute("type") === "password" ? "text" : "password";
    RepeatPassword.setAttribute("type", type);
    this.classList.toggle("bi-eye");
});

let btn2 = document.getElementById("Register");
btn2.addEventListener("click", (e) => savedata(e));

function savedata(e) {
  e.preventDefault();
  let myname = document.getElementById("name").value;
  let mysurname = document.getElementById("surname").value;
  let mypassword = document.getElementById("password").value;
  let myrepeatedpassword = document.getElementById("repeatpassword").value
  let myemail = document.getElementById("email").value;
  let myaddress = document.getElementById("address").value;
  let myage = document.getElementById("age").value

          fetch("http://localhost:8090/api/auth/signups", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              name: myname,
              surname: mysurname,
              password: mypassword,
              repeatPassword: myrepeatedpassword,
              email: myemail,
              address: myaddress,
              age: myage
            }),
          })
          .then((res) => {
            if(res.ok){   
           alert("You have successfully registered!");
           window.location.href =
                "http://127.0.0.1:5500/Post%20Vote%20Fill%20Out%20Form%20(Author%20View)/PostVoting-FillOutForm.html"; 
           } else {
           alert("Please enter valid info!");
           }
           return res;
          })
          .then((res) => res.json())
          .catch((error) => alert(error))
          .then((data) => { if(data.id != undefined){
            localStorage.setItem("userid", data.id);
          }}
      )}
      