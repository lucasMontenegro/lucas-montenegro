import path from "path"
import globals from "lib/utils/globals"
import isProduction from "lib/utils/isProduction"
import os from "os"
import fs from "fs"
const logFile = path.resolve(globals.process.cwd(), `pg-errors.log`)
export default function filterMonitorLog (msg, info) {
  if (info.event === `error`) {
    if (!isProduction()) {
      let logText = os.EOL + msg
      if (info.time) {
        logText = os.EOL + logText
      }
      fs.appendFile(logFile, logText, e => {
        if (e) {
          globals.console.error(e)
        }
      })
    }
  } else if (isProduction()) {
    info.display = false
  }
}