const Gameboard = (() => {
    let board = [["X", "O", "O"],["X", "O", "O"],["X", "O", "O"]];
    let setup = () => {
      // for (let i = 1; i <= 3; i++){
      //   for (let j = 1; j <= 3; j++){
      //     document.querySelector(i + "_" +j).addEventListener('click', event => {
      //       console.log('click set on ' + i + "_" +j);
      //     });
      //   }
      // }
      console.log('hello');
    }

    let print = () => {
      board.forEach( (row, i) => {
        row.forEach((ele, j) => {
          let position = document.querySelector(`tr:nth-child(${i + 1}) td:nth-child(${j + 1})`);
          position.innerHTML = ele;
        })
      })
    }
    return {board, print}
})();

const factoryPlayer = (name) => {
  let move = (pos) => {

  }
  return { name };
};
