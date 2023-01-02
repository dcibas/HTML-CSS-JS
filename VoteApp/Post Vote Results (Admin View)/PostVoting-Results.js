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

// let results = window.localStorage.getItem("results");
// let resultsObj = JSON.parse(results);
// let votepost = window.localStorage.getItem("votepost");
// let votepostObj = JSON.parse(votepost);
// let resultsTitle = JSON.parse(results).myTitle;
// let resultsVotingChoice1Points = JSON.parse(results).myvotingChoice1Points;
// let resultsVotingChoice2Points = JSON.parse(results).myvotingChoice2Points;
// let resultsVotingChoice3Points = JSON.parse(results).myvotingChoice3Points;
// let resultsVotingChoice4Points = JSON.parse(results).myvotingChoice4Points;
// let votepostEndDate = JSON.parse(votepost).myEnddate;

// document.getElementById("resultsTitle").textContent +=
//   " " + resultsTitle;
// document.getElementById("votingEndDate").textContent +=
//   " " + votepostEndDate;
// document.getElementById("votingchoice1Points").textContent +=
//   " " + resultsVotingChoice1Points;
// document.getElementById("votingchoice2Points").textContent +=
//   " " + resultsVotingChoice2Points;
// document.getElementById("votingchoice3Points").textContent +=
//   " " + resultsVotingChoice3Points;
// document.getElementById("votingchoice4Points").textContent +=
//   " " + resultsVotingChoice4Points;

let backBtn = document.getElementById("back");
backBtn.addEventListener("click", back);

function back(e){
e.preventDefault();
window.location.href = "http://127.0.0.1:5500/Post%20Vote%20Fill%20Out%20Form%20(Author%20View)/PostVoting-FillOutForm.html";
}

let logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", logout);

function logout(e) {
  e.preventDefault();
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
  .then((res) => res.json())
  .then(alert("You have successfully deleted your vote!"))
  .then(location.reload());
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
  localStorage.setItem("results", JSON.stringify({ myresultsId, myvotingChoice1Points, myvotingChoice2Points, myvotingChoice3Points, myvotingChoice4Points }));

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
  .then((res) => res.json())
  .then(alert("You have successfully edited your result!"))
  .then(location.reload());
}

let subBtn = document.getElementById("submit");
subBtn.addEventListener("click", submit);

function submit(e) {
  e.preventDefault();

  // let myvotepostId = document.getElementById("votepostid").value;
  // let myTitle = document.getElementById("votingtitle").value;
  // let myvotingChoice1Points = document.getElementById("votingchoice1Points").value;
  // let myvotingChoice2Points = document.getElementById("votingchoice2Points").value;
  // let myvotingChoice3Points = document.getElementById("votingchoice3Points").value;
  // let myvotingChoice4Points = document.getElementById("votingchoice4Points").value;
  // localStorage.setItem("results", JSON.stringify({ myTitle, myvotingChoice1Points, myvotingChoice2Points, myvotingChoice3Points, myvotingChoice4Points }));

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
  .then((res) => res.json())
  .then((data) => {
      if(localStorage.getItem("resultsid") == data.id){
        alert("A vote post already exists!");
        } else {
      // localStorage.setItem("resultsid", data.id);
      alert("You have successfully posted a result!");
      location.reload();
        }
      });
  // .then((data) => localStorage.setItem("resultsid", data.id))
  // .then(alert("You have successfully posted a result!"))
  // .then(location.reload());
}