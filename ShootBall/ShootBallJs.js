let circle = document.getElementById("circle");
let circleBottom = parseInt(
  window.getComputedStyle(circle).getPropertyValue("bottom")
);

let circleRight = parseInt(
  window.getComputedStyle(circle).getPropertyValue("right")
);

let circleWidth = parseInt(
  window.getComputedStyle(circle).getPropertyValue("width")
);

let ground = document.getElementById("ground");
let groundBottom = parseInt(
  window.getComputedStyle(ground).getPropertyValue("bottom")
);

let groundHeight = parseInt(
  window.getComputedStyle(ground).getPropertyValue("height")
);

let isJumping = false;
let upTime;
let downTime;

function jump() {
  if (isJumping) return;
  upTime = setInterval(() => {
    if (circleBottom >= groundHeight + 450) {
      clearInterval(upTime);
      downTime = setInterval(() => {
        if (circleBottom <= groundHeight + 10) {
          clearInterval(downTime);
          isJumping = false;
        }
        circleBottom -= 10;
        circle.style.bottom = circleBottom + "px";
      }, 20);
    }
    circleBottom += 10;
    circle.style.bottom = circleBottom + "px";
    isJumping = true;
  }, 20);
}

function control(e) {
  if (e.key == "w" || e.key == " ") {
    jump();
  }
}

document.addEventListener("keydown", control);
