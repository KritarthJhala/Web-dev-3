// calculator.js
// A simple CLI-based calculator using process.argv
//
// Usage:
//   node calculator.js add 10 5
//   node calculator.js sub 10 5
//   node calculator.js mul 10 5
//   node calculator.js div 10 5

const logger = require("./modules/logger");

// process.argv[0] -> node executable path
// process.argv[1] -> path to this script
// process.argv[2] -> operation
// process.argv[3], process.argv[4] -> operands
const args = process.argv.slice(2);
const [operation, a, b] = args;

const num1 = parseFloat(a);
const num2 = parseFloat(b);

function calculate(op, x, y) {
  switch (op) {
    case "add":
      return x + y;
    case "sub":
      return x - y;
    case "mul":
      return x * y;
    case "div":
      if (y === 0) {
        throw new Error("Division by zero is not allowed");
      }
      return x / y;
    default:
      throw new Error(`Invalid operation "${op}". Use add, sub, mul, or div.`);
  }
}

// Validate inputs
if (!operation || isNaN(num1) || isNaN(num2)) {
  logger.error("Invalid input. Usage: node calculator.js <add|sub|mul|div> <num1> <num2>");
  process.exit(1);
}

try {
  const result = calculate(operation, num1, num2);
  logger.info(`Operation: ${operation} | Numbers: ${num1}, ${num2}`);
  console.log(`Result: ${result}`);
} catch (err) {
  logger.error(err.message);
  process.exit(1);
}
