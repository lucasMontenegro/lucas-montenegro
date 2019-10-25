import React from "react"
import Div from "lib/utils/react/Div"
import Button from "@material-ui/core/Button"
export default function ButtonPlusValue ({ id, className, value, onClick }) {
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
      <Div>Value: <span className="value">{value}</span></Div>
    </Div>
  )
}