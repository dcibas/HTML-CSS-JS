let addBtn = document.getElementById("add");
addBtn.addEventListener("click", formInput);

let user = window.localStorage.getItem("user");
let userObj = JSON.parse(user);
let userEmail = JSON.parse(user).myemail;
document.getElementById("header").textContent +=
  " " + userEmail;

function formInput(e) {
  e.preventDefault();
  document.getElementById("container").style.display = "block";
  document.getElementById("list").style.display = "block";
}

let closeBtn = document.getElementById("close");
closeBtn.addEventListener("click", close);

function close(e) {
  e.preventDefault();
  document.getElementById("container").style.display = "none";
  document.getElementById("list").style.display = "none";
}

let logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", logout);

function logout(e) {
  e.preventDefault();
  alert("You have successfully logged out!");
  window.location.href = "http://127.0.0.1:5500/Main/Main.html";
}

let reloadBtn = document.getElementById("rel");
reloadBtn.addEventListener("click", reload);

function reload(e) {
  e.preventDefault();
  window.location.reload();
}

let subBtn = document.getElementById("sub");
subBtn.addEventListener("click", savelist);
function savelist(e) {
  e.preventDefault();
  let myType = document.getElementById("type").value;
  let myContent = document.getElementById("content").value;
  let myDate = document.getElementById("date").value;
  localStorage.setItem("list", JSON.stringify({ myType, myContent, myDate }));
  fetch(`http://localhost:8090/todo`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ` + localStorage.getItem("token")
    },
    body: JSON.stringify({
      type: myType,
      content: myContent,
      date: myDate,
      userId: localStorage.getItem("userid"),
    }),
  })
    .then((res) => res.json())
    .then(setTimeout(5000, load()));
}

load();
let todos = [];
let list = localStorage.getItem("list");
let userType = JSON.parse(list).myType;
let userContent = JSON.parse(list).myContent;
let userDate = JSON.parse(list).myDate;

if (list) {
  todos = userType + " | " + userContent + " | deadline: " + userDate;
}

document.getElementById("listpara").innerHTML += todos + "<br>";

let deleteBtn = document.getElementById("del");
deleteBtn.addEventListener("click", deletion);

function deletion(e) {
  e.preventDefault();
  let myId = document.getElementById("id").value;
  fetch(`http://localhost:8090/todo/${myId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ` + localStorage.getItem("token")
    },
  }).then(setTimeout(5000, load()));
}

let editBtn = document.getElementById("edt");
editBtn.addEventListener("click", edit);

function edit(e) {
  e.preventDefault();
  let qty1 = localStorage.getItem("userid");
  document.getElementById("usrid").value = qty1;
  let myType = document.getElementById("type").value;
  let myContent = document.getElementById("content").value;
  let myDate = document.getElementById("date").value;
  let myId = document.getElementById("id").value;
  let useRId = document.getElementById("usrid").value;
  fetch(`http://localhost:8090/todo/${myId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ` + localStorage.getItem("token")
    },
    body: JSON.stringify({
      type: myType,
      content: myContent,
      date: myDate,
      id: myId,
      usrId: useRId,
      userId: localStorage.getItem("userid"),
    }),
  }).then(setTimeout(5000, load()));
}

function load() {
  fetch(`http://localhost:8090/todo/user/${localStorage.getItem("userid")}`, {method: "GET",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ` + localStorage.getItem("token")
  },})
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("listpara").innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        document.getElementById(
          "listpara"
        ).innerHTML += `<br> Todo id: ${data[i].id} <br> 
      ${data[i].type} <br> ${data[i].content} <br> Deadline: ${data[i].date}<br><br><br>
      `;
      }
    });
}
