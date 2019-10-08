const path = require("path")
const { default: globals } = require("new/local/utils/globals")
const str = path.resolve(globals.process.env.BUILD_PATH, `index.html`)
exports.default = function sendFrontEndApp (req, res) {
  res.sendFile(str)
}