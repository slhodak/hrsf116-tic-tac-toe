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
      [],
      [],
      []
    ],
  turn: 'O',
  switchTurn: function() {
    Game.turn === 'O' ? Game.turn = 'X' : Game.turn = 'O';
  }
}

// Views


// Controllers
let handleTileClick = function(target) {
  Game.turn === 'O' ? target.innerText = '_O_' : target.innerText = '_X_';
  Game.switchTurn();
};
