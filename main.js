const GRID_SIZE = 16;
const canvas = document.querySelector("#canvas");
const pallete = document.querySelector("#pallete");
const colorButtons = document.querySelectorAll(".color-option");
const clearButton = document.querySelector("#clear-button");
let selectedColor;
let mouseDown = false;
let grid = [];
let colorList = new Map();
colorList.set("black", "#000000");
colorList.set("red", "#f51414");
colorList.set("green", "#19de12");
colorList.set("blue", "#0e15e6");
colorList.set("white", "#e6f0f5");

// TODO: Make an Add Color button that allows for custom colors in the pallete

document.body.onmousedown = function(e)
{
    mouseDown = true;
    e.preventDefault();
}
document.body.onmouseup = function() { mouseDown = false; }

function clearCanvas()
{
    const canvasNodes = canvas.children;
    for (node of canvasNodes)
    {
        node.style.backgroundColor = colorList.get("white");
    }
}

function getColorSelectionClass(bgColor)
{
    var color = (bgColor.charAt(0) === '#') ? 
        bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
        "selected-black" : "selected";
}

function changeColor(newColor)
{
    if (selectedColor === newColor) return;
    if (selectedColor !== undefined)
    {
        const colorButton = document.querySelector("#"+selectedColor);
        colorButton.classList.remove("selected", "selected-black");
    }
    const colorButton = document.querySelector("#"+newColor);
    colorButton.classList.add(getColorSelectionClass(colorList.get(newColor)));
    selectedColor = newColor;
}

// GENERATE COLOR PALLETE
for (let [color, hexCode] of colorList)
{
    const palleteButton = document.createElement("div");
    palleteButton.classList.add("color-option");
    palleteButton.setAttribute("id", color);
    palleteButton.style.backgroundColor = hexCode;
    palleteButton.addEventListener("click", () => {
        changeColor(color);
    });
    pallete.appendChild(palleteButton);
}
changeColor("black");

// SETTING UP THE GRID
for (let x = 0; x < GRID_SIZE; x++)
{
    grid[x] = [];
    for (let y = 0; y < GRID_SIZE; y++)
    {
        const newNode = document.createElement("div");
        newNode.style.height = (1/GRID_SIZE) * 100 + "%";
        newNode.style.width = (1/GRID_SIZE) * 100 + "%";
        newNode.style.backgroundColor = colorList.get("white");
        canvas.appendChild(newNode);
        grid[x][y] = newNode;
        
        newNode.addEventListener("mouseover", () => {
            if (!mouseDown) return;
            newNode.style.backgroundColor = colorList.get(selectedColor);
        });

        newNode.addEventListener("mousedown", () => {
            newNode.style.backgroundColor = colorList.get(selectedColor);
        });
    }
}

// SETUP CLEAR BUTTON
clearButton.addEventListener("click", clearCanvas);