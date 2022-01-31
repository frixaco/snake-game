const container = document.getElementById("game");
const rowCount = 31;
const colCount = 31;

for (let r = 0; r < rowCount; r++) {
  const row = document.createElement("div");
  row.className = "row";

  for (let c = 0; c < colCount; c++) {
    const column = document.createElement("div");
    column.className = "cell";
    row.append(column);
  }

  container.append(row);
}

function getCellAtPosition([x, y]) {
  const rows = container.children;
  const cell = rows[x - 1].children[y - 1];
  return cell;
}

let snake = [
  [5, 6],
  [6, 6],
  [7, 6],
  [7, 5],
  [7, 4],
];

function initSnake() {
  [].slice.call(container.children).forEach((row) => {
    [].slice.call(row.children).forEach((col) => {
      col.style.backgroundColor = "white";
    });
  });

  snake = [
    [5, 6],
    [6, 6],
    [7, 6],
    [7, 5],
    [7, 4],
  ];

  snake.forEach((part) => {
    const cell = getCellAtPosition(part);
    cell.style.backgroundColor = "red";
  });

  const food = getCellAtPosition([6, 2]);
  food.style.backgroundColor = "green";

  const food2 = getCellAtPosition([2, 6]);
  food2.style.backgroundColor = "green";
}

initSnake();

let down;
let up;
let left;
let right;

function clearTimers() {
  clearInterval(down);
  clearInterval(up);
  clearInterval(left);
  clearInterval(right);
}

const downPos = (pos) => [pos[0] + 1, pos[1]];
const upPos = (pos) => [pos[0] - 1, pos[1]];
const leftPos = (pos) => [pos[0], pos[1] - 1];
const rightPos = (pos) => [pos[0], pos[1] + 1];
let lost = false;
function move(posSetter) {
  if (lost) {
    return;
  }

  if (
    snake[0][0] === 1 ||
    snake[0][0] === rowCount ||
    snake[0][1] === 1 ||
    snake[0][1] === colCount
  ) {
    lost = true;
    alert("You lost");
    return;
  }

  let prev = snake[0];
  let food = false;

  let newSnake = [];
  snake.forEach((curr, index) => {
    if (index === 0) {
      prev = curr;
      const next = posSetter(curr);

      if (getCellAtPosition(next).style.backgroundColor === "green") {
        food = true;
      }

      getCellAtPosition(next).style.backgroundColor = "red";
      newSnake.push(next);
    } else {
      const next = prev;
      prev = curr;

      if (food && index === snake.length - 1) {
        getCellAtPosition(snake[snake.length - 1]).style.backgroundColor =
          "red";
        newSnake.push(next);
        getCellAtPosition(next).style.backgroundColor = "red";
        newSnake.push(prev);
      } else {
        getCellAtPosition(prev).style.backgroundColor = "white";
        getCellAtPosition(next).style.backgroundColor = "red";
        newSnake.push(next);
      }
    }
  });

  if (
    snake
      .slice(1)
      .filter((part) => part[0] === snake[0][0] && part[1] === snake[0][1])
      .length > 0
  ) {
    alert("You lost");
    lost = true;
    return;
  }
  snake = [...newSnake];
}

document.addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowDown") {
    clearTimers();
    down = setInterval(() => move(downPos), 100);
  }

  if (ev.key === "ArrowUp") {
    clearTimers();
    up = setInterval(() => move(upPos), 100);
  }

  if (ev.key === "ArrowLeft") {
    clearTimers();
    left = setInterval(() => move(leftPos), 100);
  }

  if (ev.key === "ArrowRight") {
    clearTimers();
    right = setInterval(() => move(rightPos), 100);
  }
});
