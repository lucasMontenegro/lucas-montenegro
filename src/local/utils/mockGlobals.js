module.exports = function mockGlobals (mocks) {
  const mockedGlobals = {}
  for (const name in mocks) {
    mockedGlobals[name] = global[name]
    global[name] = mocks[name]
  }
  return mockedGlobals
}