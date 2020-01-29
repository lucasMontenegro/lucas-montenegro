import globals from "lib/utils/globals"
export default function WindowTitle (props) {
  globals.document.title = props.value
  return null
}