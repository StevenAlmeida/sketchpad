const GRID_SIZE = 16;

const colorButtons = document.querySelectorAll(".color-option");
const eraserButton = document.querySelector("#eraser");
let selectedColor;

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

for (let i = 0; i < colorButtons.length; i++)
{
    const button = colorButtons[i];
    button.addEventListener("click", () => {
        changeColor(button);
    });
}
changeColor(colorButtons[0]);