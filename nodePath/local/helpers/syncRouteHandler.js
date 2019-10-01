module.exports = function syncRouteHandler (handler) {
  return (req, res, next = console.error) => Promise.resolve(handler(req, res)).catch(next)
}