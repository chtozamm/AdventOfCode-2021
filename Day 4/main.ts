type Row = string[];
type Column = string[];
type Board = {
  rows: Row[];
  columns: Column[];
};

// Read and convert input into array
const input = await Deno.readTextFile("./input.txt").then((input) =>
  input.split("\r\n")
);
const lines = input.slice(2);
const drawnNumbers = input[0].split(",");
const allRows: Row[] = lines
  .filter((row) => row !== "")
  .map((row) => row.replaceAll("  ", " ").trim().split(" "));
const ROW_LENGTH = allRows[0].length;

// Define and populate boards
const boards: Board[] = [];
const board: Board = { rows: [], columns: [[], [], [], [], []] };

for (let i = 0; i < allRows.length; i++) {
  board.rows.push(allRows[i]);
  if ((i + 1) % 5 === 0) {
    for (const row of board.rows) {
      for (let k = 0; k < 5; k++) {
        board.columns[k].push(row[k]);
      }
    }
    boards.push({ ...board });
    board.rows = [];
    board.columns = [[], [], [], [], []];
  }
}

// Replace called numbers with X
function strikeValues(row: string[], number: string) {
  return row.map((value) => (value === number ? "X" : value));
}

let firstWinner: Board = { rows: [], columns: [] };
const winners: Board[] = [];
let firstMultiplier = 1;
let lastMultiplier = 1;

// Part One
root: for (let i = 0; i < drawnNumbers.length; i++) {
  for (let k = 0; k < boards.length; k++) {
    for (let j = 0; j < ROW_LENGTH; j++) {
      boards[k].rows[j] = strikeValues(boards[k].rows[j], drawnNumbers[i]);
      let counter = 0;
      for (let l = 0; l < ROW_LENGTH; l++) {
        if (boards[k].rows[j][l] === "X") counter++;
        if (counter === 5) {
          firstWinner = boards[k];
          firstMultiplier = +drawnNumbers[i];
          break root;
        }
      }
    }
    for (let j = 0; j < ROW_LENGTH; j++) {
      boards[k].columns[j] = strikeValues(
        boards[k].columns[j],
        drawnNumbers[i]
      );
      let counter = 0;
      for (let l = 0; l < ROW_LENGTH; l++) {
        if (boards[k].columns[j][l] === "X") counter++;
        if (counter === 5) {
          firstWinner = boards[k];
          firstMultiplier = +drawnNumbers[i];
          break root;
        }
      }
    }
  }
}

// Part Two
for (let m = 0; m < drawnNumbers.length; m++) {
  root: for (let i = 0; i < drawnNumbers.length; i++) {
    for (let k = 0; k < boards.length; k++) {
      for (let j = 0; j < ROW_LENGTH; j++) {
        boards[k].rows[j] = strikeValues(boards[k].rows[j], drawnNumbers[i]);
        let counter = 0;
        for (let l = 0; l < ROW_LENGTH; l++) {
          if (boards[k].rows[j][l] === "X") counter++;
          if (counter === 5) {
            winners.push(boards[k]);
            boards.splice(k, 1);
            lastMultiplier = +drawnNumbers[i];
            break root;
          }
        }
      }
      for (let j = 0; j < ROW_LENGTH; j++) {
        boards[k].columns[j] = strikeValues(
          boards[k].columns[j],
          drawnNumbers[i]
        );
        let counter = 0;
        for (let l = 0; l < ROW_LENGTH; l++) {
          if (boards[k].columns[j][l] === "X") counter++;
          if (counter === 5) {
            winners.push(boards[k]);
            boards.splice(k, 1);
            lastMultiplier = +drawnNumbers[i];
            break root;
          }
        }
      }
    }
  }
}

const firstSum: number[] = [];
const lastSum: number[] = [];

firstWinner?.rows.forEach((row) =>
  row.forEach((value) => value !== "X" && firstSum.push(+value))
);

winners[winners.length - 1].rows.forEach((row) =>
  row.forEach((value) => value !== "X" && lastSum.push(+value))
);

const firstWinnerScore = firstMultiplier * firstSum.reduce((a, b) => a + b, 0);
const lastWinnerScore = lastMultiplier * lastSum.reduce((a, b) => a + b, 0);

console.log(firstWinnerScore);
console.log(lastWinnerScore);
