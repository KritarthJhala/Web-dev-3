// dice.js
// A random dice generator (1-6) using Node's core crypto module
// for cryptographically secure randomness instead of Math.random().
//
// Run: node dice.js
// Run multiple rolls: node dice.js 5

const crypto = require("crypto");
const logger = require("./modules/logger");

function rollDice() {
  // crypto.randomInt(min, max) -> min inclusive, max exclusive
  return crypto.randomInt(1, 7);
}

// Number of rolls can be passed as a CLI argument, defaults to 1
const rolls = parseInt(process.argv[2]) || 1;

logger.info(`Rolling the dice ${rolls} time(s)...`);

for (let i = 1; i <= rolls; i++) {
  const value = rollDice();
  console.log(`Dice Rolled: ${value}`);
}
