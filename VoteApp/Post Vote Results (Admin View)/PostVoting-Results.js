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
  
  let votePostId = localStorage.getItem("resultsid");

  fetch(`http://localhost:8090/api/results/${votePostId}`, {
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
  let myTitle = document.getElementById("votingtitle").value;
  let myvotingChoice1Points = document.getElementById("votingchoice1Points").value;
  let myvotingChoice2Points = document.getElementById("votingchoice2Points").value;
  let myvotingChoice3Points = document.getElementById("votingchoice3Points").value;
  let myvotingChoice4Points = document.getElementById("votingchoice4Points").value;
  let myEnddate = document.getElementById("enddate").value;
  localStorage.setItem("votepost", JSON.stringify({ myresultsId, myTitle, myvotingChoice1Points, myvotingChoice2Points, myvotingChoice3Points, myvotingChoice4Points, myEnddate }));

  fetch(`http://localhost:8090/api/results/${myresultsId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ` + localStorage.getItem("token")
    },
    body: JSON.stringify({
      id: myresultsId,
      votingTitle: myTitle,
      votingPoints1: myvotingChoice1Points,
      votingPoints2: myvotingChoice2Points,
      votingPoints3: myvotingChoice3Points,
      votingPoints4: myvotingChoice4Points,
      endDate: myEnddate,
      userId: localStorage.getItem("userid"),
    }),
  })
  .then((res) => res.json())
  .then(alert("You have successfully edited your vote!"))
  .then(location.reload());
}

let subBtn = document.getElementById("submit");
subBtn.addEventListener("click", submit);

function submit(e) {
  e.preventDefault();

  let myTitle = document.getElementById("votingtitle").value;
  let myvotingChoice1Points = document.getElementById("votingchoice1Points").value;
  let myvotingChoice2Points = document.getElementById("votingchoice2Points").value;
  let myvotingChoice3Points = document.getElementById("votingchoice3Points").value;
  let myvotingChoice4Points = document.getElementById("votingchoice4Points").value;
  let myEnddate = document.getElementById("enddate").value;
  localStorage.setItem("results", JSON.stringify({ myTitle, myvotingChoice1Points, myvotingChoice2Points, myvotingChoice3Points, myvotingChoice4Points, myEnddate }));

  fetch(`http://localhost:8090/api/results`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ` + localStorage.getItem("token")
    },
    body: JSON.stringify({
      votingTitle: myTitle,
      votingPoints1: myvotingChoice1Points,
      votingPoints2: myvotingChoice2Points,
      votingPoints3: myvotingChoice3Points,
      votingPoints4: myvotingChoice4Points,
      endDate: myEnddate,
      userId: localStorage.getItem("userid"),
    }),
  })
  .then((res) => res.json())
  .then((data) => localStorage.setItem("resultsid", data.id))
  .then(alert("You have successfully edited your vote!"))
  .then(location.reload());
}