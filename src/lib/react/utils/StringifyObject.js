import stringifyObject from "stringify-object"
import React from "react"
import Div from "lib/react/utils/Div"
import PropTypes from "prop-types"
export default function StringifyObject ({ id, className, source }) {
  const text = stringifyObject(source, {
    indent: `  `,
    singleQuotes: false,
  })
  return <Div color="RosyBrown"><pre id={id} className={className}>{text}</pre></Div>
}
StringifyObject.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
}