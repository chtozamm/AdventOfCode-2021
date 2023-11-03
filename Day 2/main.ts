const input = await Deno.readTextFile("./input.txt");

let horizontal = 0;
let depth = 0;

// Convert input to array
// and format: [ [command: step], ... ]
const commands = input
  .split("\n")
  .map((command) => command.split(" "))
  .map((x) => [x[0], x[1]]);

/* Part One */

for (const command of commands) {
  switch (command[0]) {
    case "forward":
      horizontal += +command[1];
      break;
    case "down":
      depth += +command[1];
      break;
    case "up":
      depth -= +command[1];
      break;
  }
}

console.log(`Part 1: ${horizontal * depth}`);

/* Part Two */

// Reset values
horizontal = 0;
depth = 0;

let aim = 0;

for (const command of commands) {
  switch (command[0]) {
    case "forward":
      horizontal += +command[1];
      depth += aim * +command[1];
      break;
    case "down":
      aim += +command[1];
      break;
    case "up":
      aim -= +command[1];
      break;
  }
}

console.log(`Part 2: ${horizontal * depth}`);
