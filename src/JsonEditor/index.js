import React from 'react'
import JsonCmp from './components/JsonCmp'
import data from './normalize-json/data.json'

const JsonEditor = () => <JsonCmp value={data} />

export default JsonEditor