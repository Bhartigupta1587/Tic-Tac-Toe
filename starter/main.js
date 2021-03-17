console.log("linked")
let statusDisplay = document.querySelector('.game-status')
let gameActive = true
let currentPlayer = 'X'
let gameState = ['', '', '', '', '', '', '', '', '']
const winningMassage = () => `player ${currentPlayer} has won!`
const drawMessage = () => 'game ended in draw'
const currentPlayerTurn = () => `It's ${currentPlayer} turn`
statusDisplay.innerHTML = currentPlayerTurn()
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', CellClick));
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
function CellClick(clickedCellEvent){
    //get the clicked cell info
    const clickedCell = clickedCellEvent.target
    //get the clicked cell number
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index'))
    //check check whether the call has already been played,
    // or if the game is paused. If either of those is true we will simply ignore the click.
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    else
        CellPlayed(clickedCell, clickedCellIndex)
        ResultValidation()
}
//update the gameState and cell value cell value
function CellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer
    clickedCell.innerHTML = currentPlayer
}
//function validate the result
function ResultValidation(){
    let roundWon =false
    for(let i=0;i<8;i++){
        let winCondition =winningConditions[i]
        let a = gameState[winCondition[0]]//fist element of winning condition
        let b = gameState[winCondition[1]]//2nd
        let c = gameState[winCondition[2]]//3rd
        if(a==''||b==''||c==''){
            continue
        }
        if(a===b && a===c){
            roundWon = true
        }
        if(roundWon){
            statusDisplay.innerHTML = winningMassage()
            gameActive =false
            return;
        }
        if(!(gameState.includes(''))){
            statusDisplay.innerHTML=drawMessage();
            gameActive=false
            return;
        }
    }
    playerChange()
}
//change the current player and update the game status message
function playerChange(){
    currentPlayer = currentPlayer ==='X'?'O':'X'
    statusDisplay.innerHTML = currentPlayerTurn()
}
//Reset the game
function restartGame(){
    gameActive = true
    currentPlayer ='X'
    gameState = ['', '', '', '', '', '', '', '', '']
    statusDisplay.innerHTML = currentPlayerTurn()
    document.querySelectorAll('.cell').forEach(cell =>cell.innerHTML='')
}
