function isEven(num) {
  if (typeof num !== "number" || isNaN(num)) {
    throw new Error("Please provide a valid number");
  }
  return num % 2 === 0;
}

module.exports = isEven;
