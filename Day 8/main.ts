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

// Count overlaps with given segments
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

  // Find segments from known digits
  const TOPLEFT_AND_CENTER = four.filter((segment) => !one.includes(segment));
  const BOTTOMLEFT_AND_BOTTOM = eight.filter(
    (segment) =>
      ![...new Set([...one, ...four, ...seven]).values()].includes(segment)
  );

  // Find digits 0, 2, 3, 5, 6, 9
  for (const value of line[0]) {
    const currentValue = value.split("");

    // Find 0
    const overlapsWithTopLeftAndCenter = countOverlaps(
      currentValue,
      TOPLEFT_AND_CENTER
    );
    if (currentValue.length === 6 && overlapsWithTopLeftAndCenter === 1)
      zero = value.split("");

    // Find 2
    const overlapsWithRightSide = countOverlaps(currentValue, one);
    if (
      currentValue.length === 5 &&
      overlapsWithRightSide === 1 &&
      overlapsWithTopLeftAndCenter === 1
    )
      two = value.split("");

    // Find 3
    const overlapsWithBottomLeftAndBottom = countOverlaps(
      currentValue,
      BOTTOMLEFT_AND_BOTTOM
    );
    if (
      currentValue.length === 5 &&
      overlapsWithTopLeftAndCenter === 1 &&
      overlapsWithBottomLeftAndBottom === 1
    )
      three = value.split("");

    // Find 5
    if (
      currentValue.length === 5 &&
      overlapsWithRightSide === 1 &&
      overlapsWithBottomLeftAndBottom === 1
    )
      five = value.split("");

    // Find 6
    if (currentValue.length === 6 && overlapsWithRightSide === 1)
      six = value.split("");

    // Find 9
    if (currentValue.length === 6 && overlapsWithBottomLeftAndBottom === 1)
      nine = value.split("");
  }

  const digits = [zero, one, two, three, four, five, six, seven, eight, nine];

  // Store four digits from input line and add result number to total
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
// --- End of Part 2 ---
