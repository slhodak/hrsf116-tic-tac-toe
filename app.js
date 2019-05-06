// Event Listeners
let tiles = document.getElementsByClassName('tile');
Array.from(tiles).forEach(element => {
  element.addEventListener('click', (e) => {
    handleTileClick(e.target);
  });
});

// Models
//    check for game end conditions
const Game = {
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
      console.log('no continue', Game.turn);
      return;
    } else {
      Game.lastMove = [tileLocation[0], tileLocation[1]];
      Game.board[tileLocation[0]][tileLocation[1]] = Game.turn;
      Game.checkForEndConditions((result) => {
        Views.refreshBoard();
        if (result) {
          Views.displayResultMessage(result);
          return;
        }
        Game.switchTurn();
      });
    }
  },
  checkForEndConditions: function(callback) {
    // check board for end conditions
    if (Game.checkForRowVictory() || Game.checkForColumnVictory() || Game.checkForDiagonalVictory()) {
      callback(Game.turn);
      return;
    }
    // if no end conditions
    callback();
  },
  checkForRowVictory: function() {
    for (var i = 0; i < Game.board.length; i++) {
      if (Game.board[i][0] === Game.turn && Game.board[i][1] === Game.turn && Game.board[i][2] === Game.turn) {
        console.log('row victory');
        return true;
      }
    }
    return false;
  },
  checkForColumnVictory: function() {
    for (var i = 0; i < Game.board.length; i++) {
      if (Game.board[0][i] && Game.board[1][i] && Game.board[2][i]) {
        console.log('column victory');
        return true;
      }
    }
    return false;
  },
  checkForDiagonalVictory: function() {
    for (var i = 0; i < Game.board.length; i++) {
      if (Game.board[0][1] === Game.turn && Game.board[1][1] === Game.turn && Game.board[2][1] === Game.turn) {
        return true;
      } else if (Game.board[2][0] === Game.turn && Game.board[1][1] === Game.turn && Game.board[0][2] === Game.turn) {
        return true;
      }
    }
    return false;
  }
}

// Views
const Views = {
  refreshBoard: function() {
    let tile = document.getElementById('tile_' + Game.lastMove[0].toString() + Game.lastMove[1].toString());
    console.log(tile);
    tile.innerText = `_${Game.turn}_`;
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
    let messageDisplay = document.getElementById('resultMessage');
    messageDisplay.innerText = message;
  }
}

// Controllers
let handleTileClick = function(target) {
  let tileCoordinates = HelperFunctions.parseTileCoordinates(target);
  Game.updateBoard(tileCoordinates);
};

const HelperFunctions = {
  parseTileCoordinates: function(tileNode) {
    let tileCoordinates = tileNode.id.split('_')[1].split('');
    return tileCoordinates.map(coord => parseInt(coord));
  }
}