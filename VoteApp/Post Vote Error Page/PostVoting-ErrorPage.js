let backBtn = document.getElementById("back");
backBtn.addEventListener("click", back);

function back(e){
    e.preventDefault();
    window.location.href = "http://127.0.0.1:5500/Login%20Form/VoteApp-Login.html";
    }