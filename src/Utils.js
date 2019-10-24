export function getRandomWages() {
    let wages = [];
    for (let i = 0; i <= 2500; i++) {
        wages[i] = (2 * Math.random()) - 1;
    }
    return wages;
}

export function generateGrid(rows, cols) {
    const containter = document.getElementById('container');
    const resultGrid = document.getElementById('resultGrid');
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    resultGrid.style.setProperty('--grid-rows', rows);
    resultGrid.style.setProperty('--grid-cols', cols);

    for (let c = 1; c <= (rows * cols); c++) {
        const cell = document.createElement("div");
        container.appendChild(cell).className   = `grid-item number-${c}`;
        containter.appendChild(cell).style      = 'background-color: black;';

        const cell_resultGrid = document.createElement("div");
        resultGrid.appendChild(cell_resultGrid).className  = `grid-item-result number-${c}`;
        resultGrid.appendChild(cell_resultGrid).style      = 'background-color: black;';
    };
}

export function getRandomInt(max) {
    return (Math.floor(Math.random() * Math.floor(max)));
}