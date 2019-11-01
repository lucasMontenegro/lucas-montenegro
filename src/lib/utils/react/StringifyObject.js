import React from "react"
import stringifyObject from "stringify-object"
import Div from "lib/utils/react/Div"
export default function StringifyObject ({ id, className, source }) {
  const text = stringifyObject(source, {
    indent: `  `,
    singleQuotes: false,
  })
  return <Div color="RosyBrown"><pre id={id} className={className}>{text}</pre></Div>
}