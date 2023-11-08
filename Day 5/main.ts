// const input = `0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2`
//   .split("\n")
//   .map((line) => line.replace(" -> ", ",").split(","));

const input = await Deno.readTextFile("./input.txt").then((input) =>
  input.split("\r\n").map((line) => line.replace(" -> ", ",").split(","))
);

let MIN = Infinity;
let MAX = -Infinity;

// Filter only horizontal and vertical lines
let lines = [];
for (const line of input) {
  if (line[0] !== line[2] && line[1] !== line[3]) continue;
  lines.push(line);
  // Set extremes for forming a map
  for (const char of line) {
    if (+char < MIN) MIN = +char;
    if (+char > MAX) MAX = +char;
  }
}

// Convert string to numbers
lines = lines.map((line) => line.map((value) => +value));

// Define and populate map of overlaps
const map = [];
const line = [];
for (let i = 0; i <= MAX; i++) {
  line.push(0);
}
for (let i = 0; i <= MAX; i++) {
  map.push([...line]);
}

for (let i = 0; i < lines.length; i++) {
  let start = null;
  let lineMin = null;
  let lineMax = null;
  let direction: "vertical" | "horizontal" = "horizontal";
  if (lines[i][0] === lines[i][2]) {
    direction = "horizontal";
    start = lines[i][0];
    if (lines[i][1] >= lines[i][3]) {
      lineMax = lines[i][1];
      lineMin = lines[i][3];
    } else {
      lineMax = lines[i][3];
      lineMin = lines[i][1];
    }
  } else if (lines[i][1] === lines[i][3]) {
    direction = "vertical";
    start = lines[i][1];
    if (lines[i][0] >= lines[i][2]) {
      lineMax = lines[i][0];
      lineMin = lines[i][2];
    } else {
      lineMax = lines[i][2];
      lineMin = lines[i][0];
    }
  }

  // console.log("Direction: " + direction);
  // console.log("Start: " + start);
  // console.log("lineMin: " + lineMin);
  // console.log("lineMax: " + lineMax);

  if (direction === "vertical") {
    for (let j = lineMin!; j <= lineMax!; j++) {
      map[start!][j]++;
    }
  } else if (direction === "horizontal") {
    for (let j = lineMin!; j <= lineMax!; j++) {
      map[j][start!]++;
    }
  }
}

let overlaps = 0;
for (let i = 0; i <= MAX; i++) {
  for (let j = 0; j <= MAX; j++) {
    if (map[i][j] > 1) overlaps++;
  }
}

console.log(overlaps);
