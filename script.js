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
const modalBackground = document.querySelector('[data-modal-background]');
const restartButton = document.querySelector('[data-restart-button]');

restartButton.addEventListener('click', restartGame);

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
        winDrawMessage.innerText = `"${currentPlayer.toUpperCase()}" Won!`; 
        modalBackground.classList.add('bg-active');
        return;
    }
    let draw = !gameState.includes("");
    if (draw) {
        winDrawMessage.innerText = 'Draw!';
        modalBackground.classList.add('bg-active');   
    }
}


function switchTurns() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}


function restartGame() {
    window.location.reload();
}

