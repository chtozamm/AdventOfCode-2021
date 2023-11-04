// Read input from file and convert to array
const input = await Deno.readTextFile("./input.txt").then((input) =>
  input.split("\r\n")
);

/* Part One */

// Contains bitsLength number of objects
// Used to count amount of 0s and 1s
// on each bit position from input values
const bitsPosition = [];
const bitsLength = input[0].length;

// Populate bitsPosition with bit counters
for (let i = 0; i < bitsLength; i++) {
  bitsPosition.push({ zeroes: 0, ones: 0 });
}

// Increase counters values respectively to input values
for (const value of input) {
  for (let i = 0; i < value.length; i++) {
    value[i] === "0" ? bitsPosition[i].zeroes++ : bitsPosition[i].ones++;
  }
}

let gammaBits = "";
let epsilonBits = "";

// Write dominant bits in gammaBits
for (const value of bitsPosition) {
  value.zeroes > value.ones ? (gammaBits += "0") : (gammaBits += "1");
}

// Invert bits in gammaBits to get epsilonBits
for (const bit of gammaBits) {
  bit === "0" ? (epsilonBits += "1") : (epsilonBits += "0");
}

// Convert from binary to decimal
const gammaRate = parseInt(gammaBits, 2);
const epsilonRate = parseInt(epsilonBits, 2);

const powerConsumption = gammaRate * epsilonRate;
console.log(`Power consumption: ${powerConsumption}`);

/* Part Two */

let filteredValues: string[] = [...input];

for (let i = 0; i < bitsLength; i++) {
  if (filteredValues.length === 1) break;
  const dominantBit = getDominantBit(filteredValues, i, "oxygen");
  if (dominantBit === 1) {
    filteredValues = [...filteredValues.filter((value) => value[i] === "1")];
  } else if (dominantBit === 0) {
    filteredValues = [...filteredValues.filter((value) => value[i] === "0")];
  }
}

function getDominantBit(
  input: string[],
  position: number,
  subject: "oxygen" | "CO2"
) {
  const bitsCounter = { zeroes: 0, ones: 0 };
  for (const value of input) {
    value[position] === "0" ? bitsCounter.zeroes++ : bitsCounter.ones++;
  }
  if (bitsCounter.zeroes > bitsCounter.ones) {
    if (subject === "oxygen") return 0;
    if (subject === "CO2") return 1;
  }
  if (bitsCounter.zeroes < bitsCounter.ones) {
    if (subject === "oxygen") return 1;
    if (subject === "CO2") return 0;
  }
  if (bitsCounter.zeroes === bitsCounter.ones) {
    if (subject === "oxygen") return 1;
    if (subject === "CO2") return 0;
  }
}

// Convert from binary to decimal
const oxygenGeneratorRating = parseInt(filteredValues[0], 2);

// Reset filteredValues
filteredValues = [...input];

for (let i = 0; i < bitsLength; i++) {
  if (filteredValues.length === 1) break;
  const dominantBit = getDominantBit(filteredValues, i, "CO2");
  if (dominantBit === 1) {
    filteredValues = [...filteredValues.filter((value) => value[i] === "1")];
  } else if (dominantBit === 0) {
    filteredValues = [...filteredValues.filter((value) => value[i] === "0")];
  }
}

// Convert from binary to decimal
const CO2ScrubberRating = parseInt(filteredValues[0], 2);

const lifeSupportRating = oxygenGeneratorRating * CO2ScrubberRating;
console.log(`Life support rating: ${lifeSupportRating}`);
