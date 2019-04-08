import React from 'react'
import JsonCmp from './components/JsonCmp'
import data from './normalize-json/data.json'

const JsonEditor = () => (
  <div>
    <h3>Json Editor</h3>
    <JsonCmp value={data} />
  </div>
)

export default JsonEditor