import React from "react"
export default React.forwardRef(function Div ({ box, color, style, ...props }, ref) {
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
})