const input = await Deno.readTextFile("./input.txt").then((input) =>
  input.split("\r\n").map((line) => line.replace(" -> ", ",").split(","))
);

// Convert string to numbers
const lines = input.map((line) => line.map((value) => +value));

let MAX_VALUE = -Infinity;

for (const line of lines) {
  for (let i = 0; i < line.length; i++) {
    if (line[i] > MAX_VALUE) MAX_VALUE = line[i];
  }
}

// Create a map of overlaps
const map = [];
const line = [];
for (let i = 0; i <= MAX_VALUE; i++) {
  line.push(0);
}
for (let i = 0; i <= MAX_VALUE; i++) {
  map.push([...line]);
}

for (let i = 0; i < input.length; i++) {
  let lineStart = null;
  let lineEnd = null;

  // Vertical lines
  if (lines[i][0] === lines[i][2]) {
    lineStart = Math.min(lines[i][1], lines[i][3]);
    lineEnd = Math.max(lines[i][1], lines[i][3]);

    for (let j = lineStart; j <= lineEnd; j++) {
      map[j][lines[i][0]]++;
    }
  }

  // Horizontal lines
  if (lines[i][1] === lines[i][3]) {
    lineStart = Math.min(lines[i][0], lines[i][2]);
    lineEnd = Math.max(lines[i][0], lines[i][2]);

    for (let j = lineStart; j <= lineEnd; j++) {
      map[lines[i][1]][j]++;
    }
  }

  let startX = null;
  let startY = null;
  let endX = null;
  let endY = null;

  // Diagonal lines
  if (
    lines[i][0] - lines[i][1] === lines[i][2] - lines[i][3] ||
    lines[i][0] - lines[i][2] === lines[i][3] - lines[i][1]
  ) {
    if (lines[i][1] < lines[i][3]) {
      startY = lines[i][1];
      endY = lines[i][3];
      startX = lines[i][0];
      endX = lines[i][2];
      if (startX < endX) {
        for (let j = startY; j <= endY; j++) {
          map[j][startX]++;
          startX++;
        }
      } else {
        for (let j = startY; j <= endY; j++) {
          map[j][startX]++;
          startX--;
        }
      }
    } else {
      startY = lines[i][3];
      endY = lines[i][1];
      startX = lines[i][2];
      endX = lines[i][0];
      if (startX < endX) {
        for (let j = startY; j <= endY; j++) {
          map[j][startX]++;
          startX++;
        }
      } else {
        for (let j = startY; j <= endY; j++) {
          map[j][startX]++;
          startX--;
        }
      }
    }
  }
}

let overlaps = 0;
for (let i = 0; i <= MAX_VALUE; i++) {
  for (let j = 0; j <= MAX_VALUE; j++) {
    if (map[i][j] > 1) overlaps++;
  }
}

console.log(overlaps);
