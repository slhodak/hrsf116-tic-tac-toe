// Event Listeners
let tiles = document.getElementsByClassName('tile');
Array.from(tiles).forEach(element => {
  element.addEventListener('click', (e) => {
    handleTileClick(e.target);
  });
});
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', (e) => {
  Game.resetGame();
});

// Models
const Game = {
  board : [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
  turn: 'X',
  lastMove: [],
  switchTurn: function() {
    Game.turn === 'O' ? Game.turn = 'X' : Game.turn = 'O';
  },
  updateBoard: function(tileLocation) {
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
        Views.displayCurrentTurn();
      });
    }
  },
  checkForEndConditions: function(callback) {
    if (Game.checkForRowVictory() || Game.checkForColumnVictory() || Game.checkForDiagonalVictory()) {
      callback(Game.turn);
      return;
    }
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
      if (Game.board[0][i] === Game.turn && Game.board[1][i] === Game.turn && Game.board[2][i] === Game.turn) {
        console.log('column victory');
        return true;
      }
    }
    return false;
  },
  checkForDiagonalVictory: function() {
    for (var i = 0; i < Game.board.length; i++) {
      if (Game.board[0][0] === Game.turn && Game.board[1][1] === Game.turn && Game.board[2][2] === Game.turn) {
        return true;
      } else if (Game.board[2][0] === Game.turn && Game.board[1][1] === Game.turn && Game.board[0][2] === Game.turn) {
        return true;
      }
    }
    return false;
  },
  resetGame: function() {
    Game.board.forEach(row => {
      for (var i = 0; i < Game.board.length; i++) {
        row[i] = null;
      }
    });
    Game.turn = 'X';
    Views.displayCurrentTurn();
    Views.clearBoard();
  }
}

// Views
const Views = {
  displayCurrentTurn: function() {
    const turnDisplay = document.getElementById('currentTurn');
    turnDisplay.innerText = Game.turn;
  },
  clearBoard: function() {
    Array.from(document.getElementsByClassName('tile')).forEach(tile => {
      tile.innerText = '___';
    });
  },
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

Views.displayCurrentTurn();