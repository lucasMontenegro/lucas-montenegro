import React from "react"
import PropTypes from "prop-types"
function Div ({ box, color, style, ...props }, ref) {
  return (
    <div
      ref={ref}
      style={{
        padding: 4,
        border: color && `2px solid ${color}`,
        margin: 4,
        minHeight: box,
        ...style,
      }}
      {...props}
    />
  )
}
export default React.forwardRef(Div)
Div.propTypes = {
  box: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
}