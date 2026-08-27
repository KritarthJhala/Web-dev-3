// modules/logger.js
// A simple custom logger module to timestamp and format console messages.

function log(message, type = "INFO") {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`);
}

// Export multiple helper functions using an object
module.exports = {
  log,
  info: (message) => log(message, "INFO"),
  success: (message) => log(message, "SUCCESS"),
  error: (message) => log(message, "ERROR"),
};
