import React from "react"
import Div from "lib/react/utils/Div"
import Button from "@material-ui/core/Button"
import StringifyObject from "lib/react/utils/StringifyObject"
import PropTypes from "prop-types"
export default function GetValue ({ id, className, value, onClick }) {
  return (
    <Div id={id} className={className} color="black">
      <h5>{id || className}</h5>
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
GetValue.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}