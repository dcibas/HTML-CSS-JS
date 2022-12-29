
let myresultsId = localStorage.getItem("resultsid");

fetch(`http://localhost:8090/api/results/${myresultsId}`, {method: "GET",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ` + localStorage.getItem("token")
  },})
    .then((res) => res.json())
    .then((data) => {
        document.getElementById(
          "votingchoice1Points"
        ).innerHTML += `<br> Completely Against:
      ${data.votingPoints1} <br><br> Partially Against: ${data.votingPoints2} 
      <br><br> Partially Agree: ${data.votingPoints3} 
      <br><br> Completely Agree: ${data.votingPoints4}
      <br><br><br>
      `;
      
    });

// fetch(`http://localhost:8090/api/results`, {method: "GET",
//   headers: {
//     "Content-type": "application/json",
//     "Authorization": `Bearer ` + localStorage.getItem("token")
//   },})
//     .then((res) => res.json())
//     .then((data) => {
//       document.getElementById("votingchoice1Points").innerHTML = "";
//       for (let i = 0; i < data.length; i++) {
//         document.getElementById(
//           "votingchoice1Points"
//         ).innerHTML += `<br> Results id: ${data[i].id} <br> Voting Choice 1 Points:
//       ${data[i].votingPoints1} <br> Voting Choice 2 Points: ${data[i].votingPoints2} 
//       <br> Voting Choice 3 Points: ${data[i].votingPoints3} 
//       <br> Voting Choice 4 Points: ${data[i].votingPoints4}
//       <br><br><br>
//       `;
//       }
//     });

// let results = window.localStorage.getItem("results");
// let resultsObj = JSON.parse(results);

 let votepost = window.localStorage.getItem("votepost");
 let votepostObj = JSON.parse(votepost);
 let resultsTitle = JSON.parse(votepost).myTitle;

// let resultsTitle = JSON.parse(results).myTitle;
// let resultsVotingChoice1Points = JSON.parse(results).myvotingChoice1Points;
// let resultsVotingChoice2Points = JSON.parse(results).myvotingChoice2Points;
// let resultsVotingChoice3Points = JSON.parse(results).myvotingChoice3Points;
// let resultsVotingChoice4Points = JSON.parse(results).myvotingChoice4Points;
 let votepostEndDate = JSON.parse(votepost).myEnddate;

 document.getElementById("resultsTitle").textContent +=
   " " + resultsTitle;
 document.getElementById("votingEndDate").textContent +=
   " " + votepostEndDate;

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
history.back();
// window.location.href = "http://127.0.0.1:5500/Post%20Vote%20Fill%20Out%20Form%20(Author%20View)/PostVoting-FillOutForm.html";
}

let logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", logout);

function logout(e) {
  e.preventDefault();
  alert("You have successfully logged out!");
  window.location.href = "http://127.0.0.1:5500/Login%20Form/VoteApp-Login.html";
}