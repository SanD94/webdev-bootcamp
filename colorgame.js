var numberOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("color-display");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  initModeButtons();
  initSquares();
  reset();
}

function initModeButtons() {
  modeButtons.forEach(function(modeButton) {
    modeButton.addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      numberOfSquares = this.textContent === "Easy" ? 3 : 6;
      reset();
    });
  });
}

function initSquares() {
  squares.forEach(function(square, i) {
    square.addEventListener("click", function() {
      var clickedColor = this.style.background;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.background = clickedColor;
      }
      else {
        this.style.background = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  });
}

function reset() {
  colors = generateRandomColors(numberOfSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  squares.forEach(function(square, i) {
    if (!colors[i]) square.style.display = "none";
    else {
      square.style.background = colors[i];
      square.style.display = "block";
    }
  });
  h1.style.background = "steelblue";
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
}


resetButton.addEventListener("click", function() {
  reset();
});


function changeColors(color) {
  squares.forEach(function(square) {
    square.style.background = color;
  });
}

function pickColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(num) {
  var arr = [];
  for (var i = 0; i < num; ++i) arr.push(randomColor());
  return arr;
}

function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}


