import globals from "lib/utils/globals"
export default function simpleErrorCallback (e) {
  if (e) {
    globals.console.error(e)
  }
}