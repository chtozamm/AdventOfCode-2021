// --- Day 8: Seven Segment Search ---
const input = await Deno.readTextFile("./input.txt").then((input) =>
  input
    .split("\r\n")
    .map((line) => line.split(" | ").map((line) => line.split(" ")))
);

// --- Part 1 ---
let counter = 0;

for (const line of input) {
  for (const value of line[1]) {
    if ([2, 3, 4, 7].includes(value.length)) counter++;
  }
}

console.log("Part 1: " + counter); // 543
// --- End of Part 1 ---

// --- Part 2 ---
let one: string[] = [];
let two: string[] = [];
let three: string[] = [];
let four: string[] = [];
let five: string[] = [];
let six: string[] = [];
let seven: string[] = [];
let eight: string[] = [];
let nine: string[] = [];
let zero: string[] = [];
let total = 0;

function countOverlaps(value: string[], segments: string[]) {
  let overlaps = 0;
  for (let i = 0; i < segments.length; i++) {
    if (value.includes(segments[i])) overlaps++;
  }
  return overlaps;
}

for (const line of input) {
  // Find 1, 4, 7, 8
  for (const value of line[0]) {
    if (value.length === 2) one = value.split("");
    if (value.length === 4) four = value.split("");
    if (value.length === 3) seven = value.split("");
    if (value.length === 7) eight = value.split("");
  }

  const topleftAndCenterSegments = four.filter(
    (segment) => !one.includes(segment)
  );
  const leftBottomAndBottomSegments = eight.filter(
    (segment) =>
      ![...new Set([...one, ...four, ...seven]).values()].includes(segment)
  );

  // Find 0
  for (const value of line[0]) {
    const currentValue = value.split("");
    const overlapsWithSegments = countOverlaps(
      currentValue,
      topleftAndCenterSegments
    );
    if (currentValue.length === 6 && overlapsWithSegments === 1)
      zero = value.split("");
  }
  // Find 2
  for (const value of line[0]) {
    const currentValue = value.split("");
    const overlapsWithSegments1 = countOverlaps(currentValue, one);
    const overlapsWithSegments2 = countOverlaps(
      currentValue,
      topleftAndCenterSegments
    );
    if (
      currentValue.length === 5 &&
      overlapsWithSegments1 === 1 &&
      overlapsWithSegments2 === 1
    )
      two = value.split("");
  }
  // Find 3
  for (const value of line[0]) {
    const currentValue = value.split("");
    const overlapsWithSegments1 = countOverlaps(
      currentValue,
      topleftAndCenterSegments
    );
    const overlapsWithSegments2 = countOverlaps(
      currentValue,
      leftBottomAndBottomSegments
    );
    if (
      currentValue.length === 5 &&
      overlapsWithSegments1 === 1 &&
      overlapsWithSegments2 === 1
    )
      three = value.split("");
  }
  // Find 5
  for (const value of line[0]) {
    const currentValue = value.split("");
    const overlapsWithSegments1 = countOverlaps(currentValue, one);
    const overlapsWithSegments2 = countOverlaps(
      currentValue,
      leftBottomAndBottomSegments
    );
    if (
      currentValue.length === 5 &&
      overlapsWithSegments1 === 1 &&
      overlapsWithSegments2 === 1
    )
      five = value.split("");
  }
  // Find 6
  for (const value of line[0]) {
    const currentValue = value.split("");
    const overlapsWithSegments = countOverlaps(currentValue, one);
    if (currentValue.length === 6 && overlapsWithSegments === 1)
      six = value.split("");
  }
  // Find 9
  for (const value of line[0]) {
    const currentValue = value.split("");
    const overlapsWithSegments = countOverlaps(
      currentValue,
      leftBottomAndBottomSegments
    );
    if (currentValue.length === 6 && overlapsWithSegments === 1)
      nine = value.split("");
  }

  const digits = [zero, one, two, three, four, five, six, seven, eight, nine];

  let output = "";

  for (const value of line[1]) {
    for (let i = 0; i < digits.length; i++) {
      if (value.split("").sort().join("") === digits[i]!.sort().join("")) {
        output += i;
      }
    }
  }
  total += +output;
}

console.log("Part 2: " + total); // 994266
