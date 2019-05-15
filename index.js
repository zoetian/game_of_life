const getRandomGrid = () => {
    const len = rowCells.value;
    const grid = new Array(len);
    for (let i = 0; i < len; i++) {
        grid[i] = new Array(len);
        for (let j = 0; j < len; j++) {
            grid[i][j] = Math.floor(Math.random()*2);
        }
    }
    return grid;
}

const drawGrid = (ctx, grid, cellSize) => {
    ctx.strokeStyle = cellStrokeColor.value;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            const currVal = grid[i][j];
            if (currVal) {
                ctx.fillStyle = cellFillColor.value;
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
            ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
}

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
}

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
}

const generation = (ctx, grid) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let boardSize = parseInt(document.getElementById('boardSizeInput').value);
        rowCells = parseInt(document.getElementById('rowCells').value),
        cellSize = boardSize / rowCells;
    drawGrid(ctx, grid, cellSize);
    const nextGenrationGrid = getNextGenGrid(grid);

    let fps = (document.getElementById('fps').value);
    setTimeout(() => {
        requestAnimationFrame(() => generation(ctx, nextGenrationGrid))
    }, 1000/ fps);
}

const paint = () => {
    let cellStrokeColor = (document.getElementById('cellStrokeColor').value),
        cellFillColor = (document.getElementById('cellFillColor').value),
        canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        grid = getRandomGrid();
    generation(ctx, grid);
}

window.onload = paint;

window.onresize = () => {
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

// debounce text input
let timeout = null;
document.addEventListener('input', e => {
    if (e.target.matches('input')) {
        e.target.onkeyup = (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {}, 200);
        };
    }
})
