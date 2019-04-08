import React from 'react'

const RecursiveCmp = ({ arr }) => {
  const n = arr.length
  const item = arr.pop()
  return <div>
    {item + ': ' + n} <br />
    {arr.length > 0 && <RecursiveCmp arr={arr} />}
  </div>
}

export default RecursiveCmp