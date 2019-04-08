import React from 'react'
import JsonCmp from './JsonCmp'

const ObjectCmp = ({ value: obj }) => <ul>
  {Object.keys(obj).map(key => <li>
    {key}: <br />
    <JsonCmp value={obj[key]} />
  </li>)}
</ul>

export default ObjectCmp