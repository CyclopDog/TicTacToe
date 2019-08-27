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

const factoryPlayer = (name) => {
  let move = (pos) => {

  }
  return { name };
};

document.querySelector("#playerName").addEventListener("submit", function(e) {
  e.preventDefault();
  namePlayer();
  document.querySelector("#playerName").style.display = "none";
});

const namePlayer = () => {
  let p1 = document.querySelector("#playerName #p1name").value;
  let p2 = document.querySelector("#playerName #p2name").value;
  let p1s = document.querySelector("#playerName #p1symbol").value;
  let p2s;
  p1s == "X" ? p2s = "O" : p2s = "X";
  document.querySelector(".p1").innerHTML = `Player 1: ${p1} - Symbol: ${p1s}`;
  document.querySelector(".p2").innerHTML = `Player 2: ${p2} - Symbol: ${p2s}`;
};