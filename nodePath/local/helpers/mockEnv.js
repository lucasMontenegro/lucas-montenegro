module.exports = function mockEnv (name, value, cb) {
  const saved = process.env[name]
  process.env[name] = value
  const result = cb()
  if (typeof saved === `string`) {
    process.env[name] = saved
  } else {
    delete process.env[name]
  }
  return result
}