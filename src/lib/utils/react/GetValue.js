import React from "react"
import Button from "@material-ui/core/Button"
import Div from "lib/utils/react/Div"
import StringifyObject from "lib/utils/react/StringifyObject"
export default function GetValue ({ id, className, value, onClick }) {
  return (
    <Div id={id} className={className} color="black">
      <h6>{id || className}</h6>
      <Div>
        <Button
          className="button"
          variant="outlined"
          onClick={onClick}
        >
          GET VALUE
        </Button>
      </Div>
      <StringifyObject className="value" source={value} />
    </Div>
  )
}