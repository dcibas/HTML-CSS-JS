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

let subBtn = document.getElementById("submit");
subBtn.addEventListener("click", submit);

function submit(e) {
  e.preventDefault();
  let myTitle = document.getElementById("votingtitle").value;
  let myDescription = document.getElementById("votingdescription").value;
  let myDate = document.getElementById("postdate").value;
  let myEnddate = document.getElementById("enddate").value;
  localStorage.setItem("votepost", JSON.stringify({ myTitle, myDate, myEnddate, myDescription }));
  fetch(`http://localhost:8090/api/votepost`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ` + localStorage.getItem("token")
    },
    body: JSON.stringify({
      votingTitle: myTitle,
      date: myDate,
      endDate: myEnddate,
      votingDescription: myDescription,
      userId: localStorage.getItem("userid"),
    }),
  })
    .then((res) => res.json())
    .then((data) => localStorage.setItem("votepostid", data.id))
    .then(alert("You have successfully submited a Vote Post!"))
    .then(
      (window.location.href =
        "http://127.0.0.1:5500/Post%20Vote%20Posted%20Form%20(Author%20View)/PostVoting-PostedVoteForm.html")
    );
}
