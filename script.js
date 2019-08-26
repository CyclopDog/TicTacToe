const Gameboard = (() => {
    let board = [["X", "O", "O"],["X", "O", "O"],["X", "O", "O"]];
    let setup = () => {
      for (let i = 1; i <= 3; i++){
        for (let j = 1; j <= 3; j++){
          let ele = document.querySelector(`tr:nth-child(${i}) td:nth-child(${j})`);
          ele.addEventListener('click', event => {
            //check
            // know which player
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
