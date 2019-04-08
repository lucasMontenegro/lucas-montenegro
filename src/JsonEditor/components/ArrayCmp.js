import React from 'react'
import JsonCmp from './JsonCmp'

const ArrayCmp = ({ value: arr }) => <ol>
  {arr.map(value => <li><JsonCmp value={value} /></li>)}
</ol>

export default ArrayCmp