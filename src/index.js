import "./styles.css";

function initMatrix() {
  const matrix = {};
  const data = [
    ".##..#.#.##...#....#..###",
    "####.#...###.####..#.....",
    "#.#.#####....######.###.#",
    "#.#..###.#.#####....#..#.",
    "####.#.#...#.##.##..#.###",
    "#.####..#####.#.#....#.##",
    ".#.####.#....###..##....#",
    "..##.#..##.#.#.###.##.#..",
    "##....#....######.###.###",
    ".#.##.###.###.###.#..#.#.",
    "#.##.#.#..#.#.....###....",
    "####.....#..###..##..##..",
    "##....#.#...####...#.#.#.",
    "...#.##..###..##..#......",
    "#....#..##.##.#..#.###..#",
    "...#...##.##.##...#.#.#..",
    ".##....#.####.#..##.#...#",
    "#.######......#.#...#.##.",
    "#.##....###...###.###....",
    "#..#.#.#.#.#..#.#.....#..",
    "...##..##.###....#.###...",
    ".######.#...###.###.#.#.#",
    "####..###.####...#..#####",
    ".##.#.##...##..##...#.#.#",
    "###...##..#..##.##..#..#."
  ];
  for (let i = 0; i < data.length; i++) {
    let y = Math.floor(data.length / 2) - i;
    let row = data[i];
    for (let j = 0; j < row.length; j++) {
      let x = j - Math.floor(row.length / 2);
      if (row[j] === "#") {
        matrix[`${x},${y}`] = "i";
      }
    }
  }
  return matrix;
}

const carrier = {
  direction: 0,
  x: 0,
  y: 0
};

function move() {
  let cell = matrix[`${carrier.x},${carrier.y}`];
  if (cell === undefined || cell === "c") {
    turnLeft();
  } else if (cell === "i") {
    turnRight();
  } else if (cell === "f") {
    turnLeft();
    turnLeft();
  }
  let newState = changeState();
  moveForward();
  return newState === "i" ? 1 : 0;
}

function changeState() {
  let currentCell = matrix[`${carrier.x},${carrier.y}`];
  currentCell = currentCell === undefined ? "c" : currentCell;
  let newState = virusState[currentCell];
  matrix[`${carrier.x},${carrier.y}`] = newState;
  return newState;
}

function clean() {
  matrix[`${carrier.x},${carrier.y}`] = { infected: false };
}

const virusState = {
  c: "w",
  w: "i",
  i: "f",
  f: "c"
};

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
];

function turnLeft() {
  carrier.direction =
    carrier.direction === 0 ? directions.length - 1 : carrier.direction - 1;
}

function turnRight() {
  carrier.direction = (carrier.direction + 1) % directions.length;
}

function moveForward() {
  //const currentLocation = carrier.location.split(",").map(x => Number(x));
  carrier.x += directions[carrier.direction][0];
  carrier.y += directions[carrier.direction][1];
}

const executions = 10000000;
const matrix = initMatrix();
let counter = 0;
for (let i = 0; i < executions; i++) {
  counter += move();
}

console.log("counter=" + counter);

document.getElementById("app").innerHTML = `
<h1>Virus project!</h1>
<div>
  counter = ${counter}
</div>`;
