import React from "react"
import { FontAwesomeIcon } from "./index.js"
import { Route } from "react-router-dom"
function Example () {
  return (
    <div style={{ fontSize: 32 }}>
      <FontAwesomeIcon icon={[`fab`, `airbnb`]} />
      <FontAwesomeIcon icon={[`fas`, `address-card`]} />
      <FontAwesomeIcon icon={[`far`, `address-card`]} />
    </div>
  )
}
export default (<Route exact path="/react/fontAwesome" component={Example} />)