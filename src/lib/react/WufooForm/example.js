import React from "react"
import WufooForm from "./index.js"
import CreateDestroy from "lib/react/utils/CreateDestroy"
import { Route } from "react-router-dom"
const style = {
  maxWidth: `50rem`,
  margin: `0 auto`,
  padding: `3rem 2rem`,
  backgroundColor: `#ffffff`,
}
function Form () {
  return <div style={style}><WufooForm hash="zdhts7212isvs6" height="435" /></div>
}
function Example () {
  return <CreateDestroy Component={Form} />
}
export default (<Route exact path="/react/WufooForm" component={Example} />)