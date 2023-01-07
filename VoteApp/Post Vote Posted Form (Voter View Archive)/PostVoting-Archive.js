fetch(`http://localhost:8090/api/votepost/archive`, {
  method: "POST",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ` + localStorage.getItem("token")
  },})
    .then((res) => res.json())
  .then((data) => {
  for (let i = 0; i < data.length; i++) {
    document.getElementById(
      "div"
    ).innerHTML += 
  `<h1>Post Vote</h1>
        <section>
        <h2 id="votingTitle">${data[i].votingTitle}</h2>
          <p class="votingenddate" id="votingEndDate">${data[i].endDate}</p>
          <br>
          <p class="votingdescription" id="votingDescription">${data[i].votingDescription}</p>
          <br />
          <button type="button" class="logout" id="logout" onclick="logout(event)">Log Out</button>
          <button type="button" id="back" onclick="back(event)">Back</button>
          <button type="button" id="results" onclick="results(event)">Results</button>
        </section>
      </div><br><br><br><br><br><br><br><br><br><br>`
    }
  });
  
document.getElementById("maindiv").style.display = "none";  

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

function back(e) {
e.preventDefault();
// history.back();
window.location.href = "http://127.0.0.1:5500/Post%20Vote%20Fill%20Out%20Form%20(Author%20View)/PostVoting-FillOutForm.html";
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
}