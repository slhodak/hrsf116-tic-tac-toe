// Event Listeners
let tiles = document.getElementsByClassName('tile');
Array.from(tiles).forEach(element => {
  element.addEventListener('click', (e) => {
    Controllers.handleTileClick(e.target);
  });
});
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', (e) => {
  Game.resetGame();
});
let showFormButton = document.getElementById('showPlayersForm');
showFormButton.addEventListener('click', (e) => {
  let form = document.getElementById('setPlayerX');
  form.hidden = !form.hidden;
});
let playerXForm = document.getElementById('setPlayerX');
playerXForm.addEventListener('submit', (e) => {
  Game.registerPlayers(e.target[0].value, e.target[1].value);
  playerXForm.hidden = true;
});

// Models
const Game = {
  players: {
    registered: false,
    X: '',
    O: ''
  },
  record: [],
  over: false,
  board : [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
  turn: 'X',
  lastMove: [],
  registerPlayers: function(playerX, playerO) {
    Game.players.X = playerX;
    Game.players.O = playerO;
    Game.players.registered = true;
    Views.displayCurrentTurn();
  },
  switchTurn: function() {
    Game.turn === 'O' ? Game.turn = 'X' : Game.turn = 'O';
  },
  processTurn: function(tileLocation) {
    if (Game.over) {
      return;
    }
    if (Game.board[tileLocation[0]][tileLocation[1]] !== null) {
      return;
    } else {
      Game.lastMove = [tileLocation[0], tileLocation[1]];
      Game.board[tileLocation[0]][tileLocation[1]] = Game.turn;
      Game.checkForEndConditions((result) => {
        Views.refreshBoard();
        if (result) {
          Views.displayResultMessage(result);
          Game.over = true;
          Game.record.push(result);
          Views.addRecordRow();
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
    } else if (Game.checkForFullBoard()) {
      callback('draw');
      return;
    }
    callback();
  },
  checkForFullBoard: function() {
    let emptySpaceFound = false;
    for (var i = 0; i < Game.board.length; i++) {
      if (emptySpaceFound) {
        break;
      }
      for (var j = 0; j < Game.board.length; j++) {
        if (!Game.board[i][j]) {
          emptySpaceFound = true;
          break;
        }
      }
    }
    return !emptySpaceFound;
  },
  checkForRowVictory: function() {
    for (var i = 0; i < Game.board.length; i++) {
      if (Game.board[i][0] === Game.turn && Game.board[i][1] === Game.turn && Game.board[i][2] === Game.turn) {
        return true;
      }
    }
    return false;
  },
  checkForColumnVictory: function() {
    for (var i = 0; i < Game.board.length; i++) {
      if (Game.board[0][i] === Game.turn && Game.board[1][i] === Game.turn && Game.board[2][i] === Game.turn) {
        return true;
      }
    }
    return false;
  },
  checkForDiagonalVictory: function() {
    if (Game.board[0][0] === Game.turn && Game.board[1][1] === Game.turn && Game.board[2][2] === Game.turn) {
      return true;
    } else if (Game.board[2][0] === Game.turn && Game.board[1][1] === Game.turn && Game.board[0][2] === Game.turn) {
      return true;
    }
    return false;
  },
  getLastWinner: function() {
    if (Game.record.length) {
      for (var i = 0; i < Game.record.length; i++) {
        if (Game.record[i] !== 'draw') {
          return Game.record[i];
        }
      }
    }
    return 'X';
  },
  resetGame: function() {
    Game.board.forEach(row => {
      for (var i = 0; i < Game.board.length; i++) {
        row[i] = null;
      }
    });
    Game.turn = Game.getLastWinner();
    Game.over = false;
    Views.displayCurrentTurn();
    Views.clearBoard();
  }
}

// Views
const Views = {
  displayCurrentTurn: function() {
    const turnDisplay = document.getElementById('currentTurn');
    if (Game.players.registered) {
      turnDisplay.innerText = `${Game.players[Game.turn]}, playing \'${Game.turn}\'` ;
    } else {
      turnDisplay.innerText = Game.turn;
    }
  },
  clearBoard: function() {
    Array.from(document.getElementsByClassName('tile')).forEach(tile => {
      tile.innerText = '___';
    });
    Views.clearWinnerDisplay();
  },
  clearWinnerDisplay: function() {
    document.getElementById('resultMessage').innerText = '';
  },
  refreshBoard: function() {
    let tile = document.getElementById('tile_' + Game.lastMove[0].toString() + Game.lastMove[1].toString());
    tile.innerText = `_${Game.turn}_`;
  },
  displayResultMessage: function(result) {
    let message = '';
    if (result === 'X' || result === 'O') {
      message = `${Game.players.registered ? Game.players[result] : Game.turn} wins!`;
    } else {
      message = 'It\'s a draw.';
    }
    let messageDisplay = document.getElementById('resultMessage');
    messageDisplay.innerText = message;
  },
  getRecordTable: function() {
    return document.getElementById('record');
  },
  addRecordRow: function() {
    let row = document.createElement('tr');
    row.style.border = '1px solid black';
    let time = document.createElement('td');
    time.style.border = '1px solid black';
    let winner = document.createElement('td');
    winner.style.border = '1px solid black';
    let now = new Date();
    time.innerText = `${now.getMonth()}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    winner.innerText = Game.players.registered ? `${Game.players[Game.turn]}(${Game.turn})` : Game.record[Game.record.length - 1];
    row.append(time);
    row.append(winner);
    Views.getRecordTable().append(row);
  }
}

// Controllers
const Controllers = {
  handleTileClick: function(target) {
    let tileCoordinates = HelperFunctions.parseTileCoordinates(target);
    Game.processTurn(tileCoordinates);
  }
};

// Helper Functions
const HelperFunctions = {
  parseTileCoordinates: function(tileNode) {
    let tileCoordinates = tileNode.id.split('_')[1].split('');
    return tileCoordinates.map(coord => parseInt(coord));
  }
}

Views.displayCurrentTurn();


//  Test Suite
const tests = {
  runAllTests: function() {
    testDraw();
    testWinner();
  },
  testDraw: function() {
    console.log('should register draw as winner in record table');
    Game.board = [
      ['X', 'X', 'O'],
      ['O', 'O', 'X'],
      ['X', 'O', null]
    ];
    let lastTile = document.getElementById('tile_22');
    Controllers.handleTileClick(lastTile);
    let expected = 'draw';
    let result = document.getElementById('record').children[0].children[1].innerText;
    if (result === expected) {
      console.log(`successfully registers no winner in draw`);
    } else {
      console.log(`expected ${result} to equal ${expected}`);
    }
  },
  testWinner: function() {
    console.log('should register name as winner in record table');
    Game.board = [
      ['X', 'X', 'O'],
      [null, 'O', 'O'],
      ['X', 'O', 'X']
    ];
    let lastTile = document.getElementById('tile_10');
    Game.over = false;
    Game.players = {
      registered: true,
      X: 'Martin',
      O: 'Lawrence'
    };
    Controllers.handleTileClick(lastTile);
    let expected = 'Martin';
    let result = document.getElementById('record').children[0].children[1].innerText;
    if (result === expected) {
      console.log(`successfully records winner's name`);
    } else {
      console.log(`expected ${result} to equal ${expected}`);
    }
  }
}