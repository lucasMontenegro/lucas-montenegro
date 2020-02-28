import globals from "lib/utils/globals"
export default function getLogoutUrl () {
  return globals.window.location.origin
}