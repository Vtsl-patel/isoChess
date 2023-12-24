const root_div = document.getElementById("root");

function initGameRender(data) {
    data.forEach((element) => {
        const rowEle = document.createElement("div");
        element.forEach((square) => {
            const squareDiv = document.createElement("div");
            squareDiv.classList.add(square.color, "square");
            rowEle.appendChild(squareDiv);
        });
        rowEle.classList.add("squareRow");
        root_div.appendChild(rowEle);
    });
}

export { initGameRender };