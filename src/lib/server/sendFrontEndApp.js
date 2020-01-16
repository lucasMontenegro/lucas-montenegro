import path from "path"
import globals from "lib/utils/globals"
const str = path.resolve(globals.process.env.BUILD_PATH, `index.html`)
export default function sendFrontEndApp (req, res) {
  res.sendFile(str)
}