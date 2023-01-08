let myresultsId = localStorage.getItem("resultsid");

fetch(`http://localhost:8090/api/results/${myresultsId}`, {method: "GET",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ` + localStorage.getItem("token")
  },})
    .then((res) => res.json())
    .then((data) => {
        document.getElementById(
          "votingchoicePoints"
        ).innerHTML += `<br> Completely Against:
      ${data.votingPoints1} <br><br> Partially Against: ${data.votingPoints2} 
      <br><br> Partially Agree: ${data.votingPoints3} 
      <br><br> Completely Agree: ${data.votingPoints4}
      <br><br><br>
      `; 
    });

    let votepost = window.localStorage.getItem("votepost");
    let votepostObj = JSON.parse(votepost);
    let resultsTitle = JSON.parse(votepost).myTitle;
    let votepostEndDate = JSON.parse(votepost).myEnddate;

    document.getElementById("resultsTitle").textContent +=
      " " + resultsTitle;
    document.getElementById("votingEndDate").textContent +=
      " " + votepostEndDate;      

let backBtn = document.getElementById("back");
backBtn.addEventListener("click", back);

function back(e){
e.preventDefault();
history.back();
// window.location.href = "http://127.0.0.1:5500/Post%20Vote%20Fill%20Out%20Form%20(Author%20View)/PostVoting-FillOutForm.html";
}

let logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", logout);

function logout(e) {
  e.preventDefault();
  // .then(localStorage.removeItem("user"))
  // .then(localStorage.removeItem("userid"))
  // .then(localStorage.removeItem("token"))
  alert("You have successfully logged out!");
  window.location.href = "http://127.0.0.1:5500/Login%20Form/VoteApp-Login.html";
}

let modalBtns = [...document.querySelectorAll(".button")];
modalBtns.forEach(function (btn) {
    btn.onclick = function () {
      let modal = btn.getAttribute("data-modal");
      document.getElementById(modal).style.display = "block";
    };
  });
let closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function (btn) {
    btn.onclick = function () {
      let modal = btn.closest(".modal");
      modal.style.display = "none";
    };
  });
  window.onclick = function (event) {
    if (event.target.className === "modal") {
      event.target.style.display = "none";
    }
  };  

let deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", deletion);

function deletion(e) {
  e.preventDefault();
  
  let myresultsId = localStorage.getItem("resultsid");

  fetch(`http://localhost:8090/api/results/${myresultsId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ` + localStorage.getItem("token")
    },
  })
.then((res) => {
if(res.ok){
localStorage.removeItem("resultsid")
alert("You have successfully deleted your vote post, votes and results!");
location.reload(); 
} else {
alert("Something went wrong!");
}
return res;
})
.then((res) => res.json())
.catch((error) => alert(error));
  // .then((res) => res.json())
  // .then(localStorage.removeItem("resultsid"))
  // .then(alert("You have successfully deleted your vote!"))
  // .then(location.reload());
}

let editBtn = document.getElementById("edit");
editBtn.addEventListener("click", edit);

function edit(e) {
  e.preventDefault();

  let myresultsId = localStorage.getItem("resultsid");
  let myvotingChoice1Points = document.getElementById("votingchoice1Points").value;
  let myvotingChoice2Points = document.getElementById("votingchoice2Points").value;
  let myvotingChoice3Points = document.getElementById("votingchoice3Points").value;
  let myvotingChoice4Points = document.getElementById("votingchoice4Points").value;
  localStorage.setItem("results", JSON.stringify({ myvotingChoice1Points, myvotingChoice2Points, myvotingChoice3Points, myvotingChoice4Points }));

  fetch(`http://localhost:8090/api/results/${myresultsId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ` + localStorage.getItem("token")
    },
    body: JSON.stringify({
      id: myresultsId,
      votingPoints1: myvotingChoice1Points,
      votingPoints2: myvotingChoice2Points,
      votingPoints3: myvotingChoice3Points,
      votingPoints4: myvotingChoice4Points,
    }),
  })
  .then((res) => {
    if(res.ok){   
   alert("You have successfully edited your result!");
   location.reload(); 
   } else {
   alert("Something went wrong!");
   }
   return res;
  })
  .then((res) => res.json())
  .catch((error) => alert(error));
}

let subBtn = document.getElementById("submit");
subBtn.addEventListener("click", submit);

function submit(e) {
  e.preventDefault();
  
  let myvotingChoice1Points = document.getElementById("votingchoice1Points").value;
  let myvotingChoice2Points = document.getElementById("votingchoice2Points").value;
  let myvotingChoice3Points = document.getElementById("votingchoice3Points").value;
  let myvotingChoice4Points = document.getElementById("votingchoice4Points").value;

  fetch(`http://localhost:8090/api/results`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ` + localStorage.getItem("token")
    },
    body: JSON.stringify({
      id: localStorage.getItem("votepostid"),
      userId: localStorage.getItem("userid"),
    }),
  })
  .then((res) => {
    if(res.ok){
    localStorage.setItem("results", JSON.stringify({ myvotingChoice1Points, myvotingChoice2Points, myvotingChoice3Points, myvotingChoice4Points }));
    alert("Congratulations! You have successfully submited your result!");
    location.reload(); 
    } else {
    alert("You have already posted a result!");
    }
    return res;
  })
  .then((res) => res.json())
  .then((data) => { if(data.id != undefined){
    localStorage.setItem("resultsid", data.id);
  }})
  .catch((error) => alert(error));
}