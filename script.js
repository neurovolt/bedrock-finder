const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");
let gridSize = 8;
let cellSize = canvas.width / gridSize;
let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);
    grid[y][x] = grid[y][x] ? 0 : 1;
    drawGrid();
});

function setGrid(size) {
    gridSize = size;
    cellSize = canvas.width / gridSize;
    grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    drawGrid();
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (grid[y][x]) {
                ctx.fillStyle = "black";
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

async function findChunk() {
    document.getElementById("result").innerText = "Processing...";
    const response = await fetch("YOUR_BACKEND_URL/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pattern: grid })
    });
    const data = await response.json();
    document.getElementById("result").innerText = 
        `Chunk Coordinates: X=${data.chunk_x}, Z=${data.chunk_z}`;
}

function resetGrid() {
    grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    drawGrid();
}

drawGrid();
