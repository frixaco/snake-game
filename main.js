const container = document.getElementById("game");
const rowCount = 11;
const colCount = 11;

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

function move(posSetter) {
  if (
    snake[0][0] === 1 ||
    snake[0][0] === rowCount ||
    snake[0][1] === 1 ||
    snake[0][1] === colCount
  ) {
    return;
  }

  // if (
  //   getCellAtPosition(posSetter(snake[0])).style.backgroundColor === "green"
  // ) {
  //   const end = [...snake].reverse()[0];
  //   const add = [end[0] + 1, end[1]];
  //   snake.push(add);
  //   getCellAtPosition(add).style.backgroundColor = "red";
  // }

  let prev = snake[0];
  snake = snake.map((curr, index) => {
    if (index === 0) {
      prev = curr;
      const next = posSetter(curr);

      getCellAtPosition(next).style.backgroundColor = "red";
      return next;
    }

    const next = prev;
    prev = curr;
    getCellAtPosition(prev).style.backgroundColor = "white";
    getCellAtPosition(next).style.backgroundColor = "red";
    return next;
  });
}

document.addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowDown") {
    clearTimers();
    down = setInterval(() => move(downPos), 200);
  }

  if (ev.key === "ArrowUp") {
    clearTimers();
    up = setInterval(() => move(upPos), 200);
  }

  if (ev.key === "ArrowLeft") {
    clearTimers();
    left = setInterval(() => move(leftPos), 200);
  }

  if (ev.key === "ArrowRight") {
    clearTimers();
    right = setInterval(() => move(rightPos), 200);
  }
});
