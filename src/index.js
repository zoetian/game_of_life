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
};

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

const generation = (ctx, grid, boardSize, cellSize, fps) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, grid, cellSize);
    const nextGenrationGrid = getNextGenGrid(grid);
    console.log('[out fps] ', fps);

    setTimeout(() => {
        console.log('[in fps] ', fps);
        requestAnimationFrame(() => generation(ctx, nextGenrationGrid, boardSize, cellSize, fps))
    }, 1000/ fps);
};

const paint = () => {
    const boardSize = parseInt(document.getElementById('boardSizeInput').value);
    const rowCells = parseInt(document.getElementById('rowCells').value);
    const cellSize = boardSize / rowCells;
    const cellStrokeColor = (document.getElementById('cellStrokeColor').value);
    const cellFillColor = (document.getElementById('cellFillColor').value);
    const fps = (document.getElementById('framesPerSecond').value);;

    // actual paint
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const grid = getRandomGrid();
    generation(ctx, grid, boardSize, cellSize, fps);
};

window.onload = paint;

window.onresize = () => {
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
};

var timeout = null;
document.addEventListener('input', e => {
    if (e.target.matches('input')) {
        e.target.onkeyup = (e) => {
            clearTimeout(timeout);
            // Make a new timeout set to go off in 800ms
            timeout = setTimeout(function () {
                console.log('Input Value:', e.target.value);
                console.log('xxxxxxxx shall repaint xxxxxxxxxxx');
                paint();
            }, 800);
        };
    }
});
