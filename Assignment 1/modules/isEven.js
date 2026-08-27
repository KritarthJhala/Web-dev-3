// modules/isEven.js
// A simple custom module that checks whether a number is even or odd.

function isEven(num) {
  if (typeof num !== "number" || isNaN(num)) {
    throw new Error("Please provide a valid number");
  }
  return num % 2 === 0;
}

// Export the function so it can be reused in other files
module.exports = isEven;
