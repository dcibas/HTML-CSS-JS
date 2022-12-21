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
window.location.href = "http://127.0.0.1:5500/Post%20Vote%20Posted%20Form%20(Voter%20View)/PostVoting-PostedVoteForm.html";
}

let resultsBtn = document.getElementById("results");
resultsBtn.addEventListener("click", results);

function results(e) {
e.preventDefault();
window.location.href = "http://127.0.0.1:5500/Post%20Vote%20Results%20(User%20View)/PostVoting-Results.html";
}
