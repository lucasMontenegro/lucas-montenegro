import React, { useState } from "react"
import { Link } from "react-router-dom"
import TextField from "@material-ui/core/TextField"
import Div from "lib/utils/react/Div"
const style = {
  display: `flex`,
  alignItems: `flex-end`,
}
export default function Navigation ({ id, initialUrl }) {
  id = id || `navigation`
  const [url, setUrl] = useState(initialUrl)
  return (
    <Div id={id} style={style} color="PaleVioletRed">
      <TextField
        className="text-field"
        label="url"
        type="text"
        size="40"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <Div><Link className="link" to={url}>Navigate!</Link></Div>
    </Div>
  )
}