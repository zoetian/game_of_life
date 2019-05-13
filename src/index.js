const boardSize = 600;
const rowCells = 40;
const cellSize = boardSize / rowCells;
const cellStrokeColor = 'teal';
const cellFillColor = 'lightSkyBlue';
const framesPerSecond = 10;

const getRandomGrid = () => {
    const grid = new Array(rowCells);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(rowCells);
        for (let j = 0; j < grid.length; j++) {
            grid[i][j] = Math.floor(Math.random()*2);
        }
    }
    return grid;
};

const drawGrid = (ctx, grid) => {
    ctx.strokeStyle = cellStrokeColor;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const currVal = grid[i][j];
            if (currVal) {
                ctx.fillStyle = cellFillColor;
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
            ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
};

const countNei = (grid, x, y) => {
    let cnt = 0;
    const rows = grid.length, cols = grid[0].length;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const row = (x+i+rows) % rows;
            const col = (y+j+cols) % cols;
            cnt += grid[row][col];
        }
    }
    cnt -= grid[x][y];
    return cnt;
};

const getNextGenGrid = (grid) => {
    const nextGrid = new Array(grid.length);
    for (let i = 0; i < grid.length; i++) {
        nextGrid[i] = new Array(grid.length);
        for (let j = 0; j < grid[0].length; j++) {
            const currVal = grid[i][j];
            const neighbors = countNei(grid, i, j);
            if (!currVal && neighbors === 3) {
                nextGrid[i][j] = 1;
            } else if (currVal && (neighbors < 2 || neighbors > 3) ){
                nextGrid[i][j] = 0;
            } else {
                nextGrid[i][j] = currVal;
            }
        }
    }
    return nextGrid;
};

const generation = (ctx, grid) => {
    ctx.clearRect(0, 0, boardSize, boardSize);
    drawGrid(ctx, grid);
    const nextGenrationGrid = getNextGenGrid(grid);
    setTimeout(() => {
        requestAnimationFrame(() => generation(ctx, nextGenrationGrid))
    }, 1000/ framesPerSecond);
};

window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const grid = getRandomGrid();
    generation(ctx, grid);
};
