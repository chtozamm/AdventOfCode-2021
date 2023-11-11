const input = await Deno.readTextFile("./input.txt").then((input) =>
  input.split(",").map((value) => +value)
);

const fuel: number[] = [];

const RANGE = 500;

for (let i = 0; i < RANGE; i++) {
  let cost = 0;
  for (const position of input) {
    // Each change of 1 step in position costs 1 more unit of fuel than the last
    let step = position;
    let expense = 1;
    while (step !== i) {
      step < i ? step++ : step--;
      cost += expense;
      expense++;
    }
  }
  fuel.push(cost);
}

console.log(fuel.reduce((a, b) => (a > b ? b : a)));
