// ゲームボードの設定
const gameBoard = Array.from({length: 20}, () => Array(10).fill(0));

// テトリミノの形状
const tetrominoes = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[1, 1, 0], [0, 1, 1]], // Z
    [[0, 1, 1], [1, 1]], // S
    [[1, 1, 1], [0, 1, 0]], // T
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1, 1], [0, 0, 1]]  // J
];

// テトリミノの生成
function createTetromino() {
    const tetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
    console.log("Generated tetromino: ", tetromino);
    return tetromino;
}


// ブロックの描画
function drawBlock(x, y, color) {
    const gameBoardElement = document.getElementById('gameBoard');
    gameBoardElement.rows[y].cells[x].style.backgroundColor = color;
}

// テトリミノの描画
function drawTetromino(tetromino, x, y) {
    console.log("Drawing tetromino: ", tetromino);
    for (let row = 0; row < tetromino.length; row++) {
        for (let col = 0; col < tetromino[row].length; col++) {
            if (tetromino[row][col]) {
                // テトリミノのブロックを描画
                drawBlock(x + col, y + row, 'red'); // 色を'red'に設定
            }
        }
    }
}
// ゲームボードの描画
function drawGameBoard() {
    for (let y = 0; y < gameBoard.length; y++) {
        for (let x = 0; x < gameBoard[y].length; x++) {
            // ゲームボードのブロックを描画
            drawBlock(x, y, gameBoard[y][x] ? 'blue' : 'white'); // 色を'blue'または'white'に設定
        }
    }
}

// ゲームオーバーの判定
function isGameOver() {
    return gameBoard[0].some(value => value === 1);
}

// ゲームボードの初期化
function initGameBoard() {
    console.log("初期化したよ")
    const gameBoardElement = document.getElementById('gameBoard');
     // 既存の行をすべて削除
     while (gameBoardElement.firstChild) {
        gameBoardElement.removeChild(gameBoardElement.firstChild);
    }
    for (let y = 0; y < gameBoard.length; y++) {
        let row = gameBoardElement.insertRow(y);
        for (let x = 0; x < gameBoard[y].length; x++) {
            row.insertCell(x);
        }
    }
}


// ゲームループ
function gameLoop() {
    if (!isGameOver()) {
        dropTetromino(tetromino, x, y);
        clearLines();
        drawGameBoard();
    } else {
        console.log("Game Over");
        initGameBoard();
    }
}

let tetromino; // グローバル変数として定義
let x;
let y;

// ゲームの開始
function startGame() {
    initGameBoard();
    tetromino = createTetromino();
    x = 5, y = 0; // 初期位置
    
    drawTetromino(tetromino, x, y);

    if (isGameOver()) {
        console.log("Game Over");
    }
}

startGame();