// Fetch all active posts in progress

// fetch(`localhost:8090/api/votepost/active`, {
//   method: "POST",
//   headers: {
//     "Content-type": "application/json",
//     "Authorization": `Bearer ` + localStorage.getItem("token")
//   },})
//     .then((res) => res.json())
// .then((data) =>
// data.forEach((element) => {
  // document.getElementById(
  //   "form-containers"
  // ).innerHTML += ;
  // let header = document.createElement("h1");
//   let mySection = document.createElement("section");
//   document.getElementById("div").append(mySection);
// })
// )

// let div = document.querySelector("div");
// let clone = div.cloneNode(true);
// div.after(clone);

let votepost = window.localStorage.getItem("votepost");
let votepostObj = JSON.parse(votepost);
let votepostTitle = JSON.parse(votepost).myTitle;
let votepostDescription = JSON.parse(votepost).myDescription;
let votepostEndDate = JSON.parse(votepost).myEnddate;

document.getElementById("votingTitle").textContent +=
  " " + votepostTitle;
document.getElementById("votingEndDate").textContent +=
  " Voting end date: " + votepostEndDate;
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

let voteBtn = document.getElementById("vote");
voteBtn.addEventListener("click", vote);

function vote(e) {
  e.preventDefault();

  let myVotinchoice = document.getElementById("votingchoices").value;
 
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
  .then((res) => {
    if(res.ok){
    alert("Congratulations! You have successfully submited your vote!");
    location.reload(); 
    } else {
    alert("You have already voted!");
    }
    return res;
  })
  .then((res) => res.json())
  .catch((error) => alert(error));
  // .then(alert("Congratulations! You have successfully submited your vote!"))
  // .then(location.reload());
}