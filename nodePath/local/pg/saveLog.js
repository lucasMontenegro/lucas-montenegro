const os = require("os")
const fs = require("fs")
const path = require("path")
const logFile = path.resolve(__dirname, `../../../pg-errors.log`)
module.exports = function saveLog () {
  const production = process.env.NODE_ENV === `production`
  return (msg, info) => {
    if (info.event === `error`) {
      let logText = os.EOL + msg
      if (info.time) {
        logText = os.EOL + logText
      }
      fs.appendFile(logFile, logText, err => err && console.log(err))
    }
    if (production) {
      info.display = false
    }
  }
}