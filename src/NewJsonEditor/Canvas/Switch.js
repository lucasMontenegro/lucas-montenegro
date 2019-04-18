import React from 'react';
import { connect } from 'react-redux';

//import NullCmp from './NullCmp';
//import BooleanCmp from './BooleanCmp';
//import StringCmp from './StringCmp';
//import NumberCmp from './NumberCmp';
//import ArrayCmp from './ArrayCmp';
//import ObjectCmp from './ObjectCmp';

export const PureSwitch = ({ id, type }) => {
  switch (type) {
    case 'null':
    //return <NullCmp />;

    case 'boolean':
    //return <BooleanCmp id={id} />;

    case 'string':
    //return <StringCmp id={id} />;

    case 'number':
    //return <NumberCmp id={id} />;

    case 'array':
    //return <ArrayCmp id={id} />;

    case 'object':
    //return <ObjectCmp id={id} />;

    return <div>{id}: {type}</div>

    default:
    if (process.env.NODE_ENV !== 'production') {
      const str = `JsonEditor.Canvas.Switch - Unexpected Datatype: ${type}`;
      throw TypeError(str);
    }
    //return <NullCmp />;

    return <div>Error</div>
  }
}

const mapStateToProps = (state, ownProps) => {
  const { type } = state.jsonEditor.canvas.byID[ownProps.id];
  return { type };
}

const Switch = connect(
  mapStateToProps
)(PureSwitch);

export default Switch;
