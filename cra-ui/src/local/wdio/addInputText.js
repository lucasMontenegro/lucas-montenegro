export default function addInputText (element, str) {
  element.addValue(new Array(element.getValue().length).fill('Backspace'))
  element.addValue(str)
}