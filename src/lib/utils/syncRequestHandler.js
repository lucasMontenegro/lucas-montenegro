import globals from "lib/utils/globals"
export default function syncRequestHandler (asyncHandler) {
  return (req, res, next = globals.console.error) => {
    return Promise.resolve(asyncHandler(req, res)).catch(next)
  }
}