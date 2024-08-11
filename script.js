const sizeBar = document.getElementById("size-bar");
const gridContainer = document.getElementById("board");
const valueText = document.getElementById("value-text");
const colorVaule = document.getElementById("color-picker");
const colorMode = document.querySelector(".color-mode");
const toggleGrid = document.querySelector(".toggle-grid");
const resetGrid = document.querySelector(".reset");
const randomColor = document.querySelector(".random-color");

let colorSwitcher = "static";
let isDrawing = false;

function setGrid(size) {
  valueText.textContent = `${size} X ${size}`;

  //Reset The Board Every Time Range Bar Value is Changed.
  gridContainer.innerHTML = "";

  for (let i = 0; i < size * size; i++) {
    let newItem = document.createElement("div");
    newItem.classList.add("grid-item");
    gridContainer.appendChild(newItem);
  }

  gridContainer.style.gridTemplateColumns = `repeat(${size},1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size},1fr)`;
}

function getColor(color) {
  const currentColor = color;
  return currentColor;
}

//Function to generate random color.
function randomizeColor() {
  const letters = `0123456789ABCDEF`;
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function handleMouseOver(e) {
  if (colorSwitcher === "static") {
    if (e.button === 0) {
      isDrawing = true;
      if (e.target.classList.contains("grid-item")) {
        e.target.style.backgroundColor = getColor(colorVaule.value);
      }
    }
  } else if (colorSwitcher === "random") {
    if (e.button === 0) {
      isDrawing = true;
      if (e.target.classList.contains("grid-item")) {
        e.target.style.backgroundColor = randomizeColor();
      }
    }
  }
}

gridContainer.addEventListener("mousedown", (e) => handleMouseOver(e));

gridContainer.addEventListener("mouseup", () => {
  isDrawing = false;
});

gridContainer.addEventListener("mouseover", (e) => {
  if (isDrawing && e.target.classList.contains("grid-item")) {
    switch (colorSwitcher) {
      case "static":
        e.target.style.backgroundColor = getColor(colorVaule.value);
        break;

      case "random":
        e.target.style.backgroundColor = randomizeColor();
        break;
    }
  }
});

//Reset Button
resetGrid.addEventListener("click", () => {
  const gridItem = document.querySelectorAll(".grid-item");
  gridItem.forEach((item) => {
    item.removeAttribute("style");
  });
});

//Switch Grid Items Board On/Off
toggleGrid.addEventListener("click", () => {
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    item.classList.toggle("hidden-border");
  });
});

//Random Color Button
randomColor.addEventListener("click", (e) => {
  colorSwitcher = "random";
  e.target.classList.add("active");
  colorMode.classList.remove("active");
});

//Color Mode Button
colorMode.addEventListener("click", (e) => {
  colorSwitcher = "static";
  e.target.classList.add("active");
  randomColor.classList.remove("active");
});

//Range Bar
sizeBar.addEventListener("input", () => setGrid(sizeBar.value));

//Set Default Grid with 20.
setGrid(20);
