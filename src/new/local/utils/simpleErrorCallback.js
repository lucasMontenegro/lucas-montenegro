import globals from "new/local/utils/globals"
export default function simpleErrorCallback (e) {
  if (e) {
    globals.console.error(e)
  }
}