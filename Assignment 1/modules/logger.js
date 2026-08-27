function log(message, type = "INFO") {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`);
}

module.exports = {
  log,
  info: (message) => log(message, "INFO"),
  success: (message) => log(message, "SUCCESS"),
  error: (message) => log(message, "ERROR"),
};
