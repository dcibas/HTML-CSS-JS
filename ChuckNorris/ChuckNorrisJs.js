const container = document.getElementById("container");
let addBtn = document.getElementById("jokeBtn");
addBtn.addEventListener("click", addCard);
let clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearCard);
let clicks = 0;
let count = 0;

function clearCard() {
  container.replaceChildren();
  clicks = 0;
  count = 0;
  document.getElementById("clicks").textContent = clicks;
  document.getElementById("letters").textContent = count;
}

function addCard(e) {
  e.preventDefault();

  fetch("https://api.chucknorris.io/jokes/random")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(function (json) {
        throw json;
      });
    })
    .then((data) => {
      let myTime = new Date();
      let myDiv = document.createElement("div");
      myDiv.classList = "card";
      let photo = document.createElement("img");
      let myP = document.createElement("p");
      let link = document.createElement("a");
      let myP2 = document.createElement("p");
      photo.src = "Chuck.png";
      photo.classList = "photo";
      myP.classList = "text";
      myP.id = "txt";
      link.href = "https://api.chucknorris.io/jokes/random";
      myP2.id = "txt2";
      let myBtn1 = document.createElement("button");
      myBtn1.textContent = "Generate Random Color";
      myBtn1.addEventListener("click", addColor);
      myBtn1.style.borderRadius = "2rem";
      myBtn1.style.fontFamily = "'Courier New', Courier, monospace";
      myBtn1.style.fontWeight = "bold";
      myBtn1.style.width = "12rem";
      myBtn1.style.height = "2rem";
      myBtn1.style.marginRight = "0.6rem";
      myDiv.style.background = `linear-gradient(to right,${getRandomHEXColor()},${getRandomHEXColor()})`;
      function addColor() {
        myDiv.style.background = `linear-gradient(to right,${getRandomHEXColor()},${getRandomHEXColor()})`;
      }
      function getRandomHEXColor() {
        const SEED = "0123456789abcdef";
        let output = "#";
        while (output.length < 7) {
          output += SEED[Math.floor(Math.random() * SEED.length)];
        }
        return output;
      }
      let myBtn2 = document.createElement("button");
      myBtn2.textContent = "Close";
      myBtn2.style.borderRadius = "2rem";
      myBtn2.style.fontFamily = "'Courier New', Courier, monospace";
      myBtn2.style.fontWeight = "bold";
      myBtn2.style.width = "8rem";
      myBtn2.style.height = "2rem";
      myBtn2.addEventListener("click", function () {
        myDiv.style.display = "none";
        clicks -= 1;
        document.getElementById("clicks").textContent = clicks;
        count -= myP.textContent.length;
        document.getElementById("letters").textContent = count;
      });

      myP.textContent = data.value;
      link.textContent = link.href;
      myP2.textContent = "Updated @ " + myTime;
      myDiv.append(photo);
      myDiv.append(myP2);
      myDiv.append(link);
      myDiv.append(myP);
      myDiv.append(myBtn1);
      myDiv.append(myBtn2);
      document.getElementById("container").append(myDiv);
      clicks += 1;
      document.getElementById("clicks").textContent = clicks;
      count += myP.textContent.length;
      document.getElementById("letters").textContent = count;
    })
    .catch(function (error) {
      console.warn(error);
    });
}
