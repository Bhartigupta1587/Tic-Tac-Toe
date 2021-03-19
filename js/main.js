console.log("linked")
let gameActive = true
let currentPlayer=''
let chooseFirst=''
let gameState = ['', '', '', '', '', '', '', '', '']
let player1point = 0
let player2Point = 0
let tieValue = 0
document.querySelector('#X').addEventListener('click',choosePlayerX)
document.querySelector('#O').addEventListener('click',choosePlayerO)
let statusDisplay = document.querySelector('.game-status')
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => 'Game ended in Draw'
const currentPlayerTurn = () => `It's ${currentPlayer} turn`
statusDisplay.innerHTML = currentPlayerTurn()
if(currentPlayer==='') {
    alert("choose player first")
}
//When click on any cell
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
//When click on restart button
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
//Handel which is Cell Clicked
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
//Update the gameState and cell value
function cellPlayed(clickedCell, clickedCellIndex) {
    document.querySelector(".game-container").addEventListener('click',()=>playSound())
    gameState[clickedCellIndex] = currentPlayer
    clickedCell.innerHTML = currentPlayer
    if (currentPlayer === 'X') {
        document.querySelectorAll('.cell')[clickedCellIndex].style.color = 'black'
        document.querySelectorAll('.cell')[clickedCellIndex].style.background = 'skyblue'
    } else
        document.querySelectorAll('.cell')[clickedCellIndex].style.color = 'red'

}
//Validate the result
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
            rotateBoard()
            roundWon = true
            scoreUpdate()

        }
        if (roundWon) {
            statusDisplay.innerHTML = winningMessage()
            gameActive = false
            return;
        }
    }
    if (!(gameState.includes(''))) {
        tiePoints()
        tieAnimationBoard()
        statusDisplay.innerHTML = drawMessage();
        gameActive = false
        return;
    }

    playerChange()
}
//Change the current player and update the game status message
function playerChange() {
    if(currentPlayer===''){
        alert("choose player first")
    }
    else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        statusDisplay.innerHTML = currentPlayerTurn()
    }
}
//Reset the game
function restartGame() {
    gameActive = true
    currentPlayer = chooseFirst
    gameState = ['', '', '', '', '', '', '', '', '']
    statusDisplay.innerHTML = currentPlayerTurn()
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '')
    document.querySelectorAll('.cell').forEach(cell => cell.style.background= 'white')
    document.querySelector('.game-container').classList.remove('animate__animated', 'animate__jello')
    document.querySelector('.game-container').classList.remove('animate__animated', 'animate__flash')
}
//Update the players scores
function scoreUpdate() {
    if (currentPlayer === 'X') {
        player1point++
        document.querySelector('#player1').innerHTML = player1point.toString()
    }
    else if (currentPlayer === 'O'){
        player2Point++
        document.querySelector('#player2').innerHTML = player2Point.toString()
    }
}
//Update the tie scores
function tiePoints(){
    tieValue++
    document.querySelector('#tie').innerHTML = tieValue.toString()
}
//First time player 'X' value
function choosePlayerX() {
    if(currentPlayer==='') {
        currentPlayer = 'X'
        chooseFirst=currentPlayer
        currentPlayerTurn()
        console.log(currentPlayer);
    }
}
//First time player 'O' value
function choosePlayerO(){
    if(currentPlayer==='') {
        currentPlayer = 'O'
        chooseFirst=currentPlayer
        currentPlayerTurn()
        console.log(currentPlayer);
    }
}
//Sound effect when cell clicked
function playSound() {
    let sound = document.getElementById("audio");
    sound.play();
}
//Game wins board animation
function rotateBoard(){
    console.log('rotate')
    let gameBox = document.querySelector('.game-container')
    gameBox.classList.add('animate__animated', 'animate__jello');
   gameBox.style.setProperty('--animate-duration', '2s')
}
//Game draw board animation
function tieAnimationBoard(){
    let gameBox = document.querySelector('.game-container')
    gameBox.classList.add('animate__animated', 'animate__flash');
    //gameBox.style.setProperty('--animate-duration', '2s')
}