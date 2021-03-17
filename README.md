**# Tic-Tac-Toe**

I have three files in total:
. index.html (will hold basic UI and import the other files we need(style.css, script.js))
. style.css (to make game look decent)
. script.js (will hold our game logic, and handle everything else we need)

First, let’s break down the user interface:

title
Tells the Player information
. Should display a message informing the current player it’s their turn
. Should show us who won the game
. Should show us if the game ended in a draw
3x3 grid
. The grid should be clickable
. The grid cells should have the correct player sign displayed an information display
Restart button
. Will restart the entire game

Next, let’s break down the game flow for a cell click:

. Needs to track any clicks that happen on our cells
. Needs to check if a valid move has been made
    . Needs to make sure nothing happens if an already played cell has been clicked
. We should update our game state
. We should validate the game state
    . Check if a player has won
    . Check if the game ended in a draw
. Either stop the game or change the active player, depending on the above checks
. Reflect the updates made on the UI
. Repeat