import React from 'react'
import NullCmp from './NullCmp'
import NumberCmp from './NumberCmp'
import StringCmp from './StringCmp'
import ArrayCmp from './ArrayCmp'
import ObjectCmp from './ObjectCmp'

const JsonCmp = ({ value }) => {
  if (value === null) return <NullCmp />

  // eslint-disable-next-line
  switch (typeof value) {
    case 'string':
    return <StringCmp value={value} />

    case 'number':
    return <NumberCmp value={value} />

    case 'object':
    if (value instanceof Array) {
      return <ArrayCmp value={value} />
    }
    return <ObjectCmp value={value} />
  }
}

export default JsonCmp