import React, { useState } from "react"
import Div from "lib/react/utils/Div"
import StringifyObject from "lib/react/utils/StringifyObject"
import TextField from "lib/react/utils/TextField"
import CreateDestroy from "lib/react/utils/CreateDestroy"
import DocumentTitle from "./index.js"
import { Route } from "react-router-dom"
function Example () {
  const [value, setValue] = useState(`Lucas Montenegro`)
  return (
    <Div>
      <h4>Document Title</h4>
      <StringifyObject id="saved-document-title" source={value} />
      <TextField
        id="update-document-title"
        initialValue={value}
        onSave={str => setValue(str)}
      />
      <CreateDestroy id="mount-document-title" Component={DocumentTitle} props={{ value }} />
    </Div>
  )
}
export default (<Route exact path="/react/DocumentTitle" component={Example} />)