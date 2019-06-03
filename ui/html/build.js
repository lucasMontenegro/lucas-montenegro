const path = require("path")
const fs = require("fs-extra")
const mustache = require("mustache")

const template = fs.readFileSync(
  path.resolve(__dirname, `index.mustache`),
  { encoding: `utf8` }
)
const html = mustache.render(template, process.env)
fs.outputFileSync(path.resolve(__dirname, `index.html`), html)
