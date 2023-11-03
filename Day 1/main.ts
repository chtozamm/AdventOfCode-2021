// 1. Read text from file
// 2. Split text into array of strings
// 3. Convert strings to numbers

const inputText = await Deno.readTextFile("./input.txt");
const inputArray = inputText.split("\n");
const inputArrayOfNumbers = inputArray.map((x) => Number(x));

function countIncreasedValues(array: number[]) {
  // Initialize previous value as Infinity for convenience
  // counter of times current value is bigger than previous
  let previous = Infinity;
  let counter = 0;

  for (const current of array) {
    if (current > previous) counter++;
    previous = current;
  }

  return counter;
}

/* Part One */

const answer1 = countIncreasedValues(inputArrayOfNumbers);

console.log(`Part 1: ${answer1}`);

/* Part Two */

const arr = [];
const arrayOfSums = [];

for (const current of inputArrayOfNumbers) {
  arr.push(current);

  if (arr.length === 3) {
    arrayOfSums.push(arr.reduce((a, b) => a + b, 0));
    arr.shift();
  }
}

const answer2 = countIncreasedValues(arrayOfSums);

console.log(`Part 2: ${answer2}`);
