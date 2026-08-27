const isEven = require("./modules/isEven");
const logger = require("./modules/logger");

logger.info("Starting module reusability demo...");

const numbersToCheck = [4, 7, 10, 15, 22, 33];

numbersToCheck.forEach((num) => {
  const result = isEven(num) ? "Even" : "Odd";
  logger.success(`${num} is ${result}`);
});

logger.info("Demo finished.");

