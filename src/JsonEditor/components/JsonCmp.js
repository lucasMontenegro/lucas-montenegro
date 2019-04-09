import React from 'react';
import NullCmp from './NullCmp';

import StringCont from '../containers/StringCont';
import NumberCont from '../containers/NumberCont';
import ArrayCont from '../containers/ArrayCont';
import ObjectCont from '../containers/ObjectCont';

const JsonCmp = ({ id, type }) => {
  switch (type) {
    case 'null':
    return <NullCmp />;

    case 'string':
    return <StringCont id={id} />;

    case 'number':
    return <NumberCont id={id} />;

    case 'array':
    return <ArrayCont id={id} />;

    case 'object':
    return <ObjectCont id={id} />;

    default:
    if (process.env.NODE_ENV !== 'production') {
      throw TypeError(`JsonCmp Component Type: ${type}`);
    }
    return <NullCmp />;
  }
}

export default JsonCmp;