const players = ["X", "O"];
let turn = 0;
let gameOver = false;

let boardRow;
let boardStandard;

function startGame() {
  const rows = document.getElementById("p1");
  const columns = document.getElementById("p2");
  const winValue = document.getElementById("p3");

  if (
    isEmpty(rows.value) ||
    isEmpty(columns.value) ||
    isEmpty(winValue.value)
  ) {
    alert("Vui lòng nhập vào trường còn trống!");
    return;
  }
  if (winValue.value > rows.value && winValue.value > columns.value) {
    alert("Trường giá trị thắng không được phép hơn số hàng hoặc số cột!!");
    return;
  }

  boardRow = new Array(parseInt(rows.value)).fill("");
  boardStandard = boardRow.map(() =>
    new Array(parseInt(columns.value)).fill("")
  );
  rows.setAttribute("disabled", true);
  columns.setAttribute("disabled", true);
  winValue.setAttribute("disabled", true);
  rows.setAttribute("style", "color: #ccc");
  columns.setAttribute("style", "color: #ccc");
  winValue.setAttribute("style", "color: #ccc");

  initGame();
}

const handleClick = (cell, i, j) => {
  const el = cell;

  //ban đầu thì cell trống => el.textContent === ""
  // mà ta lại nói là el.textContent !== "" =>> trả về false
  // sau khi ta click vào thì el.textContent đã insert X or O vào rồi nên =>el.textContent === 'X' or 'O'
  //=> el.textContent !== "" =>> sẽ trả về true => hàm handleClick sẽ bị chết ở dòng 46
  if (el.textContent !== "" || gameOver) {
    return;
  }

  boardStandard[i][j] = turn % 2 === 0 ? "X" : "O";
  // console.log(boardStandard);
  el.textContent = boardStandard[i][j];

  if (calculateWinder(i, j)) {
    alert(players[turn % 2] + " won!!");
    gameOver = true;
    return;
  }
  turn++;
  document.getElementById("turn").innerHTML = "Đến lượt " + players[turn % 2];
};
const initGame = () => {
  const rows = parseInt(document.getElementById("p1").value);
  const columns = parseInt(document.getElementById("p2").value);

  const tableContainer = document.getElementById("table-container");
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.addEventListener("click", () => handleClick(cell, i, j));
      // handleClick(cell, i, j);
      row.appendChild(cell);
    }
    tableContainer.appendChild(row);
  }
};

function calculateWinder(row, column) {
  const winValue = document.getElementById("p3").value;
  const pickedValue = boardStandard[row][column];
  const rowQuantity = document.getElementById("p1").value;
  const colQuantity = document.getElementById("p2").value;
  //check Row
  let countRow = 1;
  let colsUp = column + 1;
  while (colsUp < colQuantity && pickedValue === boardStandard[row][colsUp]) {
    countRow++;
    colsUp++; //column + 1 +1
  }
  let colsDown = column - 1;
  // while (colsDown >= 0 && pickedValue === boardStandard[row][colsDown]) {
  //   countRow++;
  //   colsDown--;
  // }
  console.log(countRow);
  // console.log("countRow: " + countRow);
  if (countRow >= winValue) {
    return true;
  }

  // check Column
  let countColumn = 1;
  let rowsDown = row - 1;
  while (rowsDown >= 0 && pickedValue === boardStandard[rowsDown][column]) {
    countColumn++;
    rowsDown--;
  }
  let rowsUp = row + 1;
  while (
    rowsUp < rowQuantity &&
    pickedValue === boardStandard[rowsUp][column]
  ) {
    countColumn++;
    rowsUp++;
  }
  if (countColumn >= winValue) {
    return true;
  }

  //check Diagonal
  let countDiagonal = 1;
  let diagRowUps = row + 1;
  let diagColUps = column + 1;
  while (
    diagColUps < colQuantity &&
    diagRowUps < rowQuantity &&
    pickedValue === boardStandard[diagRowUps][diagColUps]
  ) {
    countDiagonal++;
    diagRowUps++;
    diagColUps++;
  }

  let diagRowDowns = row - 1;
  let diagColDowns = column - 1;
  while (
    diagRowDowns >= 0 &&
    diagColDowns >= 0 &&
    pickedValue === boardStandard[diagRowDowns][diagColDowns]
  ) {
    countDiagonal++;
    diagRowDowns--;
    diagColDowns--;
  }

  let countDiagonal1 = 1;
  let diagRowDecre = row - 1;
  let diagColIncre = column + 1;
  while (
    diagRowDecre >= 0 &&
    diagColIncre < colQuantity &&
    pickedValue === boardStandard[diagRowDecre][diagColIncre]
  ) {
    countDiagonal1++;
    diagRowDecre--;
    diagColIncre++;
  }
  let diagRowCre = row + 1;
  let diagColDecre = column - 1;
  while (
    diagRowCre < rowQuantity &&
    diagColDecre >= 0 &&
    pickedValue === boardStandard[diagRowCre][diagColDecre]
  ) {
    countDiagonal1++;
    diagRowCre++;
    diagColDecre--;
  }
  if (countDiagonal >= winValue || countDiagonal1 >= winValue) {
    return true;
  }

  return false;
}

const isEmpty = (value) => !value || !value.trim();
