const fish = await Deno.readTextFile("./input.txt").then((input) =>
  input.split(",").map((value) => +value)
);

const DAYS = 256;

// Create an array with 9 values,
// 1 value for each generation of fish
const generations = Array(9).fill(0);

// Populate array of generations
for (const generation of fish) {
  generations[generation]++;
}

/* 
RULES:
Each day, a 0 becomes a 6 and adds a new 8 to the end of the list,
while each other number decreases by 1 if it was present at the start of the day. 
*/

for (let day = 0; day < DAYS; day++) {
  if (generations[0] > 0) {
    generations.push(generations[0]);
    generations[7] += generations[0];
  } else {
    generations.push(0);
  }
  generations.shift();
}

const totalFish = generations.reduce((a, b) => a + b, 0);

console.log(totalFish);
