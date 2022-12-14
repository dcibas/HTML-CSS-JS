let numbers = [5, 1, 7, 2, -9, 8, 2, 7, 9, 4, -5, 2, -6, 8, -4, 6];

let text = "";
numbers.forEach(function callback(value, index) {
  text += `<p><b>Index Nr: ${index}, value: ${value}</b></p>`;
  document.getElementById("para").innerHTML = text;
});
