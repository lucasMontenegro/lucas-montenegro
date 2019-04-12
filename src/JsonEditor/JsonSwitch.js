import React from 'react';
import { connect } from 'react-redux';

import NullCmp from './NullCmp';
import StringCmp from './StringCmp';
import NumberCmp from './NumberCmp';
import ArrayCmp from './ArrayCmp';
import ObjectCmp from './ObjectCmp';

export const PureJsonSwitch = ({ id, type }) => {
  switch (type) {
    case 'null':
    return <NullCmp />;

    case 'string':
    return <StringCmp id={id} />;

    case 'number':
    return <NumberCmp id={id} />;

    case 'array':
    return <ArrayCmp id={id} />;

    case 'object':
    return <ObjectCmp id={id} />;

    default:
    if (process.env.NODE_ENV !== 'production') {
      throw TypeError(`JsonSwitch Component Type: ${type}`);
    }
    return <NullCmp />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { type } = state.jsonEditor.byID[ownProps.id];
  return { type };
}

const JsonSwitch = connect(
  mapStateToProps
)(PureJsonSwitch);

export default JsonSwitch;
