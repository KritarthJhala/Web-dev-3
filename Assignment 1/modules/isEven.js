function isEven(num) {
  if (typeof num !== "number" || isNaN(num)) {
    throw new Error("Please provide a valid number");
  }
  else if(num%2===0){
    return "Even";
  }
  return "Odd";
}

module.exports = isEven;
