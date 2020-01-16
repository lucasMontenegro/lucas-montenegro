import os from "os"
import fs from "fs"
import path from "path"
import simpleErrorCallback from "new/local/utils/simpleErrorCallback"
import globals from "new/local/utils/globals"
const logFile = path.resolve(globals.process.cwd(), `pg-errors.log`)
export default function saveMonitorError (msg, info) {
  let logText = os.EOL + msg
  if (info.time) {
    logText = os.EOL + logText
  }
  fs.appendFile(logFile, logText, simpleErrorCallback)
}