// Event Listeners
let tiles = document.getElementsByClassName('tile');
Array.from(tiles).forEach(element => {
  element.addEventListener('click', (e) => {
    handleTileClick(e.target);
  });
});

// Models
//    check for game end conditions
let Game = {
  board : [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
  turn: 'O',
  switchTurn: function() {
    Game.turn === 'O' ? Game.turn = 'X' : Game.turn = 'O';
  },
  updateBoard: function() {

    checkForEndConditions((none, result) => {
      if (none) {
        refreshBoard();
        return;
      }
      
      if (result === 'o') {
        displayResultMessage('O wins!');
      } else if (result === 'x') {
        displayResultMessage('X wins!');
      } else {
        displayResultMessage('It\'s a draw.');
      }
    });
  },
  checkForEndConditions: function() {

  }
}

// Views
let refreshBoard = function() {

};

let displayResultMessage = function(message) {
  
};


// Controllers
let handleTileClick = function(target) {
  // Game.turn === 'O' ? target.innerText = '_O_' : target.innerText = '_X_';

  Game.switchTurn();
};
