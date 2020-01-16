const { console } = global
module.exports = function syncRequestHandler (asyncHandler) {
  return (req, res, next = console.error) => Promise.resolve(asyncHandler(req, res)).catch(next)
}