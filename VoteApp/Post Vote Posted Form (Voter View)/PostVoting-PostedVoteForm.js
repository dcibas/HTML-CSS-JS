let votepost = window.localStorage.getItem("votepost");
let votepostObj = JSON.parse(votepost);
let votepostTitle = JSON.parse(votepost).myTitle;
let votepostDescription = JSON.parse(votepost).myDescription;
let votepostEndDate = JSON.parse(votepost).myEnddate;

document.getElementById("votingTitle").textContent +=
  " " + votepostTitle;
document.getElementById("votingEndDate").textContent +=
  " " + votepostEndDate;
document.getElementById("votingDescription").textContent +=
  " " + votepostDescription;

let resultsBtn = document.getElementById("results");
resultsBtn.addEventListener("click", results);

function results(e) {
e.preventDefault();

if (localStorage.getItem("userid") == 3) {
  window.location.href = "http://127.0.0.1:5500/Post%20Vote%20Results%20(Admin%20View)/PostVoting-Results.html";
} else {
  window.location.href = "http://127.0.0.1:5500/Post%20Vote%20Results%20(User%20View)/PostVoting-Results.html";
}

}

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

// let votingchoice1Btn = document.getElementById("votingchoice1")
// votingchoice1Btn.addEventListener("click", votingchoice1);

// function votingchoice1 (e) {
// e.preventDefault();
// document.getElementById("votingchoice1").style.background = 'rgb(242, 255, 0)';
// document.getElementById("votingchoice2").style.background = 'white';
// document.getElementById("votingchoice3").style.background = 'white';
// document.getElementById("votingchoice4").style.background = 'white';
// }

// let votingchoice2Btn = document.getElementById("votingchoice2")
// votingchoice2Btn.addEventListener("click", votingchoice2);

// function votingchoice2 (e) {
// e.preventDefault();
// document.getElementById("votingchoice2").style.background = 'rgb(242, 255, 0)';
// document.getElementById("votingchoice1").style.background = 'white';
// document.getElementById("votingchoice3").style.background = 'white';
// document.getElementById("votingchoice4").style.background = 'white';
// }

// let votingchoice3Btn = document.getElementById("votingchoice3")
// votingchoice3Btn.addEventListener("click", votingchoice3);

// function votingchoice3 (e) {
// e.preventDefault();
// document.getElementById("votingchoice3").style.background = 'rgb(242, 255, 0)';
// document.getElementById("votingchoice4").style.background = 'white';
// document.getElementById("votingchoice2").style.background = 'white';
// document.getElementById("votingchoice1").style.background = 'white';
// }

// let votingchoice4Btn = document.getElementById("votingchoice4")
// votingchoice4Btn.addEventListener("click", votingchoice4);

// function votingchoice4 (e) {
// e.preventDefault();
// document.getElementById("votingchoice4").style.background = 'rgb(242, 255, 0)';
// document.getElementById("votingchoice3").style.background = 'white';
// document.getElementById("votingchoice2").style.background = 'white';
// document.getElementById("votingchoice1").style.background = 'white';
// }

let voteBtn = document.getElementById("vote");
voteBtn.addEventListener("click", vote);

function vote(e) {
  e.preventDefault();

  let myVotinchoice = document.getElementById("votingchoices").value;
  // let myVotinchoice = document.querySelector('input');
  // let myVotinchoice = document.getElementsByName("votingchoice").value;
  // let myVotinchoice = document.querySelectorAll('input[type=button]');
 
  fetch(`http://localhost:8090/api/votepost/vote`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ` + localStorage.getItem("token")
    },
    body: JSON.stringify({
      votingChoice: myVotinchoice,
      votePostId: localStorage.getItem("votepostid"),
      userId: localStorage.getItem("userid"),
    }),
  })
    .then((res) => res.json())
    .then(alert("Congratulations! You have successfully submited your vote!"))
    .then(location.reload());
}