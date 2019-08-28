const factoryPlayer = (name = "", symbol = "") => {
  let move = (pos) => {

  }
  return { name, symbol };
};

const Manager = (() => {

  let player1 = factoryPlayer();
  let player2 = factoryPlayer();

  let toggle = 0;
  let currentPlayer = player1;

  const start = () => {
    document.querySelector("#name-form").addEventListener("submit", function(e) {
      e.preventDefault();

      player1.name = document.querySelector("#name-form #p1name").value;
      player1.symbol = document.querySelector("#name-form #p1symbol").value;

      player2.name = document.querySelector("#name-form #p2name").value;
      player2.symbol = player1.symbol == "X" ? "O" : "X";


      Ui.setup(player1, player2);
      Gameboard.setup();
      displayTurn();
    });
  }

  const toggler = () => {
    toggle == 0 ? toggle = 1 : toggle = 0;
    currentPlayer = toggle == 0 ? player1 : player2;
  }

  const displayTurn = () => {
    document.querySelector("#turn").innerHTML = `${currentPlayer.name}'s turn`;
  }

  let curSymbol = () => currentPlayer.symbol;

  return {start, toggler, displayTurn, curSymbol}
})();

const Ui = (() => {
  const setup = (p1,p2) => {
    document.querySelector("#name-form").style.display = "none";
    document.querySelector("table").style.display = "block";
    document.querySelector("#intro").innerHTML = `${p1.name}(${p1.symbol}) vs ${p2.name}(${p2.symbol})`;
  }
  const clearMsg = () => {
    document.querySelector("#message").innerHTML = "";
  }
  const gameOver = () => {
    document.querySelector("#message").innerHTML = "GAME OVER :)";
    document.querySelector("#turn").innerHTML = "";
    document.querySelector("table").style.pointerEvents = "none";
  }

  return {setup, clearMsg, gameOver};
})();

const Gameboard = (() => {
    let board = [[],[],[]];

    let gameOn = () => {
      let winCombos = [];
      //rows
      winCombos.push(board[0].join(""));
      winCombos.push(board[1].join(""));
      winCombos.push(board[2].join(""));
      //cols
      winCombos.push([board[0][0], board[1][0], board[2][0]].join(""));
      winCombos.push([board[0][1], board[1][1], board[2][1]].join(""));
      winCombos.push([board[0][2], board[1][2], board[2][2]].join(""));
      //diags
      winCombos.push([board[0][0], board[1][1], board[2][2]].join(""));
      winCombos.push([board[0][2], board[1][1], board[2][0]].join(""));

      for(let i = 0; i < winCombos.length; i++){
        if (winCombos[i] == "XXX" || winCombos[i] == "OOO"){
          Ui.gameOver();
          return false;
        }
      }
      return true;
    };

    let updateBoard = (row, col) => {
      board[row][col] = Manager.curSymbol();
    };

    let checkBoard = (row, col) => {
      if (board[row][col]){
        document.querySelector("#message").innerHTML = "Position taken, try a different move.";
        return false;
      }
      else{ return true;}
    }

    let setup = () => {
      for (let i = 1; i <= 3; i++){
        for (let j = 1; j <= 3; j++){
          let ele = document.querySelector(`tr:nth-child(${i}) td:nth-child(${j})`);
          ele.addEventListener('click', event => {
            if (checkBoard(i-1, j-1)){
              Ui.clearMsg();
              updateBoard(i-1, j-1);
              ele.innerHTML = board[i-1][j-1];
              if (gameOn()){
                Manager.toggler();
                Manager.displayTurn();
              }
            }
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
