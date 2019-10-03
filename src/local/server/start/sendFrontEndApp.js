const path = require("path")
const str = path.resolve(process.env.BUILD_PATH, `index.html`)
module.exports = function sendFrontEndApp (req, res) {
  res.sendFile(str)
}