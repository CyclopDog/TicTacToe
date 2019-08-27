const factoryPlayer = (name = "", symbol = "") => {
  let move = (pos) => {

  }
  return { name, symbol };
};

const Manager = (() => {

  let player1 = factoryPlayer();
  let player2 = factoryPlayer();

  let toggle = 0;
  let currentPlayer;

  const start = () => {
    document.querySelector("#name-form").addEventListener("submit", function(e) {
      e.preventDefault();

      player1.name = document.querySelector("#name-form #p1name").value;
      player1.symbol = document.querySelector("#name-form #p1symbol").value;

      player2.name = document.querySelector("#name-form #p2name").value;
      player2.symbol = player1.symbol == "X" ? "O" : "X";

      currentPlayer = turn();
      Ui.setup(player1, player2);
      Gameboard.setup();
      displayTurn(currentPlayer);
    });
  }

  const turn = () => {
    return toggle == 0 ? player1 : player2;
  }

  const displayTurn = (player) => {
    document.querySelector("#turn").innerHTML = `${player.name}'s turn`;
  }

  const toggler = () => {
    toggle == 0 ? toggle = 1 : toggle = 0;
  }

  return {start, toggler, turn}
})();

const Ui = (() => {
  const setup = (p1,p2) => {
    document.querySelector("#name-form").style.display = "none";
    document.querySelector("table").style.display = "block";
    document.querySelector("#intro").innerHTML = `${p1.name}(${p1.symbol}) vs ${p2.name}(${p2.symbol})`;
  }
  return {setup};
})();

const Gameboard = (() => {
    let board = [["1", "2", "3"],["4", "5", "6"],["7", "8", "9"]];

    let boardInput = (row, col) => {
      board[row][col] = currentPlayer.symbol;
    };

    let setup = () => {
      for (let i = 1; i <= 3; i++){
        for (let j = 1; j <= 3; j++){
          let ele = document.querySelector(`tr:nth-child(${i}) td:nth-child(${j})`);
          ele.addEventListener('click', event => {
            // check if empty
            // know which player is making the move
            ele.innerHTML = board[i-1][j-1];
            Manager.toggler();
            Manager.turn();
          });
        }
      }
    }

    let print = () => {
      board.forEach( (row, i) => {
        row.forEach((ele, j) => {
          let position = document.querySelector(`tr:nth-child(${i + 1}) td:nth-child(${j + 1})`);
          position.innerHTML = ele;
        })
      })
    }

    return {board, print, setup}
})();


// Start Game
Manager.start();
