const activeTest = ``
module.exports = function describeOrSkip (name, cb) {
  if (!activeTest) {
    return describe(name, cb)
  }
  return activeTest === name ? describe(name, cb) : describe.skip(name, cb)
}