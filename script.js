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
  return {setup};
})();

const Gameboard = (() => {
    let board = [[],[],[]];
    let winPositions =  [
      [[0,0],[0,1],[0,2]],
      [[1,0],[1,1],[1,2]],
      [[2,0],[2,1],[2,2]],

      [[0,0],[1,0],[2,0]],
      [[0,1],[1,1],[2,1]],
      [[0,2],[1,2],[2,2]],

      [[0,0],[1,1],[2,2]],
      [[2,0],[1,1],[0,2]]
    ];

    let gameover = () => {

      for (let i = 0; i < winPositions.length; i++) {
        let pos1 = board[winPositions[i][0][0],winPositions[i][0][1]];
        let pos2 = board[winPositions[i][1][0],winPositions[i][1][1]];
        let pos3 = board[winPositions[i][2][0],winPositions[i][2][1]];
        console.log(pos1);
        // let win = (pos1 == pos2) && (pos2 == pos3) && pos1 && pos2 && pos3;
        // if(win){return true;}
      }
      return false;
    };

    let updateBoard = (row, col) => {
      board[row][col] = Manager.curSymbol();
    };

    let checkBoard = (row, col) => {
      if (board[row][col]){
        document.querySelector("#message").innerHTML = "Position taken, try a different move.";
        return false;
      }
      else if(gameover()){
        document.querySelector("#message").innerHTML = "GAME OVER :)";
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
              document.querySelector("#message").innerHTML = "";
              updateBoard(i-1, j-1);
              ele.innerHTML = board[i-1][j-1];
              Manager.toggler();
              Manager.displayTurn();
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

    return {board, print, setup, gameover}
})();


// Start Game
Manager.start();
