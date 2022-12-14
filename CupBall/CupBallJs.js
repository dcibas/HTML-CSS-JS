function start(str) {

  let step = 200;
  switch (str) {
    case "left":
      var y = document.getElementById("shuffle").offsetLeft;
      y = y + step;
      document.getElementById("shuffle").style.left = y + "px";
      break;
    case "right":
      var y = document.getElementById("shuffle").offsetLeft;
      y = y - step;
      document.getElementById("shuffle").style.left = y + "px";
      break;
  }

}
