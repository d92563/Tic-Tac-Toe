const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let currentPlayer = 'x';
const winDrawMessage = document.querySelector('[data-win-draw]');
const squares = document.querySelectorAll('[data-square]');

squares.forEach(square => {
    square.addEventListener('click', playTurn, {once: true})
})

function playTurn(e) {
    if (gameActive) {
        const square = e.target;
        const squareIndex = parseInt(square.getAttribute('data-square'));
        placeMarker(square, squareIndex); 
        winCheck();
        switchTurns();
    }
}

function placeMarker(square, squareIndex) {
    gameState[squareIndex] = currentPlayer;
    square.innerText = currentPlayer;
}

function switchTurns() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

function winCheck() {
    let win = false;
    for (let i = 0; i < 8; i++) {
        let winningCombo = winningCombinations[i];
        let a = gameState[winningCombo[0]];
        let b = gameState[winningCombo[1]];
        let c = gameState[winningCombo[2]];
        if (a === '' || b === '' || c === '') continue; 
        if(a === b && b === c) {
            win = true;
            break;
        } 
    }
    if(win) {
        gameActive = false;
        winDrawMessage.innerText = `${currentPlayer} won!`; 
        return;
    }
    let draw = !gameState.includes("");
    if (draw) {
        winDrawMessage.innerText = 'Draw!';   
    }
}

