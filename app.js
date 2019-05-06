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
  lastMove: [],
  switchTurn: function() {
    Game.turn === 'O' ? Game.turn = 'X' : Game.turn = 'O';
  },
  updateBoard: function(tileLocation) {
    //  change value in board model depending on span clicked
    if (Game.board[tileLocation[0]][tileLocation[1]] !== null) {
      return;
    } else {
      Game.lastMove = [tileLocation[0], tileLocation[1]];
      console.log(Game.lastMove);
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
    if (checkForRowVictory() || checkForColumnVictory() || checkForDiagonalVictory()) {
      callback(null, Game.turn);
      return;
    }
    
    // if no end conditions
    callback(true);
  },
  checkForRowVictory: function() {

  },
  checkForColumnVictory: function() {

  },
  checkForDiagonalVictory: function() {

  }
}

// Views
const Views = {
  refreshBoard: function() {
    
  },
  displayResultMessage: function(result) {
    let message = '';
    if (result === 'O') {
      message = 'O wins!';
    } else if (result === 'X') {
      message = 'X wins!';
    } else {
      message = 'It\'s a draw.';
    }
    // render message to the DOM
  }
}

// Controllers
let handleTileClick = function(target) {
  let tileCoordinates = HelperFunctions.parseTileCoordinates(target);
  Game.updateBoard(tileCoordinates);
  Game.switchTurn();
};

const HelperFunctions = {
  parseTileCoordinates: function(tileNode) {
    let tileCoordinates = tileNode.id.split('_')[1].split('');
    return tileCoordinates.map(coord => parseInt(coord));
  }
}