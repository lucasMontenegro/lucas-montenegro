import DarkMode, { useDarkMode } from "./index.js"
import React from "react"
import GetValue from "lib/utils/react/GetValue"
import { Route } from "react-router-dom"
function ToggleDarkMode () {
  const darkMode = useDarkMode()
  return <GetValue className="toggle-dark-mode" value={darkMode} onClick={darkMode.toggle} />
}
function Example () {
  return (
    <DarkMode>
      <ToggleDarkMode />
      <ToggleDarkMode />
    </DarkMode>
  )
}
export default (<Route exact path="/react/DarkMode" component={Example} />)