let backBtn = document.getElementById("back");
backBtn.addEventListener("click", back);

function back(e){
    e.preventDefault();
    // history.back();
    window.location.href = "http://127.0.0.1:5500/Login%20Form/VoteApp-Login.html";
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