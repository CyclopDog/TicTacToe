const factoryPlayer = () => {
  let move = (pos) => {

  }
  return { name };
};


const Manager = (() => {
  let player1 = factoryPlayer();
  let player2 = factoryPlayer();

  let start = () => {
    document.querySelector("#name-form").addEventListener("submit", function(e) {
      e.preventDefault();
      let player1 = namePlayer.p1;
      let player2 = namePlayer.p2;
      console.log(player1);
      document.querySelector("#name-form").style.display = "none";
      document.querySelector("table").style.display = "block";
      Gameboard.setup();
    });
  }

  //let player1 = factoryPlayer('somethign');
  return {start}
})();



const Gameboard = (() => {
    let board = [["X", "O", "O"],["X", "O", "O"],["X", "O", "O"]];

    let setup = () => {
      for (let i = 1; i <= 3; i++){
        for (let j = 1; j <= 3; j++){
          let ele = document.querySelector(`tr:nth-child(${i}) td:nth-child(${j})`);
          ele.addEventListener('click', event => {
            // check if empty
            // know which player is making the move
            ele.innerHTML = "move: " + i + " " + j;
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




const namePlayer = (() => {
  let p1 = document.querySelector("#name-form #p1name").value;
  let p2 = document.querySelector("#name-form #p2name").value;

  let p1s = document.querySelector("#name-form #p1symbol").value;
  let p2s;
  p1s == "X" ? p2s = "O" : p2s = "X";

  // document.querySelector(".p1").innerHTML = `Player 1: ${p1} - ${p1s}`;
  // document.querySelector(".p2").innerHTML = `Player 2: ${p2} - ${p2s}`;
  return {p1, p1s}
})();

// Start Game
Manager.start();
