const fs = require("fs");
const logger = require("./modules/logger");

const filePath = "./test.txt";

// 1. CREATE FILE
function createFile() {
  logger.info("Creating File...");
  fs.writeFile(filePath, "Hello Node.js", (err) => {
    if (err) {
      return logger.error(`Failed to create file: ${err.message}`);
    }
    logger.success("File Created");
    readFile();
  });
}

// 2. READ FILE
function readFile() {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return logger.error(`Failed to read file: ${err.message}`);
    }
    logger.info("Reading File");
    console.log(data);
    updateFile();
  });
}

// 3. UPDATE FILE 
function updateFile() {
  fs.appendFile(filePath, "\nLearning FS Module", (err) => {
    if (err) {
      return logger.error(`Failed to update file: ${err.message}`);
    }
    logger.success("File Updated");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return logger.error(`Failed to read file: ${err.message}`);
      }
      console.log(data);
      deleteFile();
    });
  });
}

// 4. DELETE FILE
function deleteFile() {
  fs.unlink(filePath, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        return logger.error("File does not exist, nothing to delete.");
      }
      return logger.error(`Failed to delete file: ${err.message}`);
    }
    logger.success("File Deleted");
  });
}

createFile();
