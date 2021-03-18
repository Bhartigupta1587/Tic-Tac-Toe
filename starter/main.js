console.log("linked")
let statusDisplay = document.querySelector('.game-status')
let gameActive = true
let currentPlayer = 'X'
let gameState = ['', '', '', '', '', '', '', '', '']
let player1point = 0
let player2Point = 0
let tieValue = 1
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => 'game ended in draw'
const currentPlayerTurn = () => `It's ${currentPlayer} turn`
statusDisplay.innerHTML = currentPlayerTurn()
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.game-restart').addEventListener('click', restartGame);
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
//Handel Cell Click
function cellClick(clickedCellEvent) {
    //get the clicked cell info
    const clickedCell = clickedCellEvent.target
    //get the clicked cell number
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index'))
    //check check whether the call has already been played,
    // or if the game is paused. If either of those is true we will simply ignore the click.
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    } else
        cellPlayed(clickedCell, clickedCellIndex)
    resultValidation()
}
//update the gameState and cell value cell value
function cellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer
    clickedCell.innerHTML = currentPlayer
    if (currentPlayer === 'X') {
        document.querySelectorAll('.cell')[clickedCellIndex].style.color = 'black'
    } else
        document.querySelectorAll('.cell')[clickedCellIndex].style.color = 'red'
}
//function validate the result
function resultValidation() {
    let roundWon = false
    for (let i = 0; i < 8; i++) {
        let winCondition = winningConditions[i]
        let first = gameState[winCondition[0]] //fist element of winning condition
        let second = gameState[winCondition[1]] //2nd
        let third = gameState[winCondition[2]] //3rd
        if (first === '' || second === '' || third === '') {
            continue
        }
        if (first === second && first === third) {
            roundWon = true
            scoreUpdate()
        }
        if (roundWon) {
            statusDisplay.innerHTML = winningMessage()
            gameActive = false
            return;
        }
        if (!(gameState.includes(''))) {
            tiePoints()
            statusDisplay.innerHTML = drawMessage();
            gameActive = false
            return;
        }
    }
    playerChange()
}
//change the current player and update the game status message
function playerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    statusDisplay.innerHTML = currentPlayerTurn()
}
//Reset the game
function restartGame() {
    gameActive = true
    currentPlayer = 'X'
    gameState = ['', '', '', '', '', '', '', '', '']
    statusDisplay.innerHTML = currentPlayerTurn()
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '')
}

function scoreUpdate() {
    if (currentPlayer === 'X') {
        player1point++
        document.querySelector('#player1').innerHTML = player1point.toString()
    } else {
        player2Point++
        document.querySelector('#player2').innerHTML = player1point.toString()
    }
}
function tiePoints(){
    tieValue++
    document.querySelector('#tie').innerHTML = tieValue.toString()
}
