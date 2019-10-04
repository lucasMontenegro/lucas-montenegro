const os = require("os")
const fs = require("fs")
const path = require("path")
const simpleErrorCallback = require("local/utils/simpleErrorCallback")
const logFile = path.resolve(process.env.NODE_PATH, `../pg-errors.log`)
module.exports = function saveMonitorError (msg, info) {
  let logText = os.EOL + msg
  if (info.time) {
    logText = os.EOL + logText
  }
  fs.appendFile(logFile, logText, simpleErrorCallback)
}