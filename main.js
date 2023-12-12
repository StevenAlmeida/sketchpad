const GRID_SIZE = 16;
const COLOR_LIST = ["black", "red", "green", "blue", "eraser"];
const canvas = document.querySelector("#canvas");
const colorButtons = document.querySelectorAll(".color-option");
const clearButton = document.querySelector("#clear-button");
let selectedColor;
let mouseDown = false;
let grid = [];

/* TODO: Make selectedColor be a string with the color value
         Load color selector with colors from the color list
         Add a clear canvas button
*/

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
        node.classList.remove(...COLOR_LIST);
        node.classList.add("eraser");

    }
}

function changeColor(newColor)
{
    if (selectedColor === newColor) return;
    if (selectedColor !== undefined)
    {
        selectedColor.classList.remove("selected", "selected-black");
    }

    if (newColor.getAttribute('id') === "eraser")
    {
        newColor.classList.add("selected-black");
    }
    else
    {
        newColor.classList.add("selected");
    }
    selectedColor = newColor;
}

// SETTING UP THE COLOR BUTTONS
for (let i = 0; i < colorButtons.length; i++)
{
    const button = colorButtons[i];
    button.addEventListener("click", () => {
        changeColor(button);
    });
}
// SET BLACK AS THE STARTING COLOR
changeColor(colorButtons[0]);

// SETTING UP THE GRID
for (let x = 0; x < GRID_SIZE; x++)
{
    grid[x] = [];
    for (let y = 0; y < GRID_SIZE; y++)
    {
        const newNode = document.createElement("div");
        newNode.style.height = (1/GRID_SIZE) * 100 + "%";
        newNode.style.width = (1/GRID_SIZE) * 100 + "%";
        newNode.classList.add("eraser");
        canvas.appendChild(newNode);
        grid[x][y] = newNode;
        
        newNode.addEventListener("mouseover", () => {
            if (!mouseDown) return;
            const color = selectedColor.getAttribute("id")
            if (newNode.classList.contains(color)) return;
            newNode.classList.remove(...COLOR_LIST);
            newNode.classList.add(color);
        });

        newNode.addEventListener("mousedown", () => {
            const color = selectedColor.getAttribute("id")
            if (newNode.classList.contains(color)) return;
            newNode.classList.remove(...COLOR_LIST);
            newNode.classList.add(color);
        });
    }
}

// SETUP CLEAR BUTTON
clearButton.addEventListener("click", clearCanvas);