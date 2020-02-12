import React, { useState } from "react"
import Div from "lib/react/utils/Div"
import MuiTextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
const style = {
  display: `flex`,
  alignItems: `flex-end`,
}
export default function TextField (props) {
  const [value, saveValue] = useState(props.initialValue)
  const id = props.id || `text-field`
  return (
    <Div id={id} style={style} color="PaleVioletRed">
      <Div>
        <MuiTextField
          className="field"
          label={id}
          type="text"
          size="40"
          value={value}
          onChange={e => saveValue(e.target.value)}
        />
      </Div>
      <Div>
        <Button className="button" variant="outlined" onClick={() => props.onSave(value)}>
          SAVE
        </Button>
      </Div>
    </Div>
  )
}