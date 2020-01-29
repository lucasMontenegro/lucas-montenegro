import React, { useState } from "react"
import Div from "lib/react/utils/Div"
import TextField from "lib/react/utils/TextField"
import WindowTitle from "./index.js"
import { Route } from "react-router-dom"
const initialValue = `Lucas Montenegro`
function Example () {
  const [title, setTitle] = useState(initialValue)
  return (
    <Div>
      <h4>Window Title</h4>
      <TextField id="window-title" initialValue={initialValue} onSave={str => setTitle(str)} />
      <WindowTitle value={title} />
    </Div>
  )
}
export default (<Route exact path="/react/WindowTitle" component={Example} />)