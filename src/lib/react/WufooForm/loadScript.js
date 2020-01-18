import globals from "lib/utils/globals"
import embedForm from "./embedForm"
export default function loadScript (hash, height) {
  const script = globals.document.createElement(`SCRIPT`)
  script.src = `https://secure.wufoo.com/scripts/embed/form.js`
  script.onload = script.onreadystatechange = function () {
    const rs = this.readyState
    if (rs && rs !== `complete` && rs !== `loaded`) return
    embedForm(hash, height)
  }
  const sibling = globals.document.getElementsByTagName(`SCRIPT`)[0]
  sibling.parentNode.insertBefore(script, sibling)
}