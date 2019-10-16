import path from "path"
import globals from "new/local/utils/globals"
const str = path.resolve(globals.process.env.BUILD_PATH, `index.html`)
export default function sendFrontEndApp (req, res) {
  res.sendFile(str)
}