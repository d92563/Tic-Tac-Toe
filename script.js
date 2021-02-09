const xTurn = 'x';
const circleTurn = 'o';
let playerTurn;
const squares = document.querySelectorAll('[data-square]');

squares.forEach(square => {
    square.addEventListener('click', playTurn, {once: true})
})

function playTurn(e) {
    const square = e.target;
    const currentPlayer = playerTurn ? circleTurn : xTurn ;
    placeMarker(square, currentPlayer); 
    switchTurns();
}

function placeMarker(square, currentPlayer) {
    square.innerText = currentPlayer;
}

function switchTurns() {
    playerTurn = !playerTurn;
}