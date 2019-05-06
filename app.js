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
  updateBoard: function(tileLocation) {
    //  change value in board model depending on span clicked
    if (Game.board[tileLocation[0]][tileLocation[1]] !== null) {
      return;
    } else {
      Game.board[tileLocation[0]][tileLocation[1]] = Game.turn;
      console.log(Game.board);
      Game.switchTurn();
      Game.checkForEndConditions((none, result) => {
        if (none) {
          refreshBoard();
          return;
        }
        Views.displayResultMessage(result);
      });
    }
  },
  checkForEndConditions: function(callback) {
    // check board for end conditions
    callback(null, result);
    
    // if no end conditions
    callback(true);
  }
}

// Views
const Views = {
  refreshBoard: function() {
  },
  displayResultMessage: function(result) {
    let message = '';
    if (result === 'o') {
      message = 'O wins!';
    } else if (result === 'x') {
      message = 'X wins!';
    } else {
      message = 'It\'s a draw.';
    }
    // render message to the DOM
  }
}

// Controllers
let handleTileClick = function(target) {
  // Game.turn === 'O' ? target.innerText = '_O_' : target.innerText = '_X_';
  let tileCoordinates = target.id.split('_')[1].split('');
  tileCoordinates = tileCoordinates.map(coord => parseInt(coord));
  Game.updateBoard(tileCoordinates);
  Game.switchTurn();
};
