const os = require("os")
const fs = require("fs")
const path = require("path")
const { default: simpleErrorCallback } = require("new/local/utils/simpleErrorCallback")
const { default: globals } = require("new/local/utils/globals")
const logFile = path.resolve(globals.process.env.NODE_PATH, `../pg-errors.log`)
exports.default = function saveMonitorError (msg, info) {
  let logText = os.EOL + msg
  if (info.time) {
    logText = os.EOL + logText
  }
  fs.appendFile(logFile, logText, simpleErrorCallback)
}