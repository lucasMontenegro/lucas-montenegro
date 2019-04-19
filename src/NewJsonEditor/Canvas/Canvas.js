import React from 'react';
import { connect } from 'react-redux';
import Cursor from '../Cursor';

import EmptyCmp from './EmptyCmp';
import NullCmp from './NullCmp';
//import BooleanCmp from './BooleanCmp';
import StringCmp from './StringCmp';
import NumberCmp from './NumberCmp';
//import ArrayCmp from './ArrayCmp';
//import ObjectCmp from './ObjectCmp';

export const PureCanvas = ({ id, type }) => {
  let content;
  let expand = false;
  switch (type) {
    case 'empty':
    content = <EmptyCmp />;
    expand = true;
    break

    case 'null':
    content = <NullCmp />;
    break

    case 'boolean':
    //return <BooleanCmp id={id} />;
    content = <div>boolean: {id}</div>;
    break

    case 'string':
    content = <StringCmp id={id} />;
    break

    case 'number':
    content = <NumberCmp id={id} />;
    break

    case 'array':
    //return <ArrayCmp id={id} />;
    content = <div>array: {id}</div>;
    break

    case 'object':
    //return <ObjectCmp id={id} />;
    content = <div>object: {id}</div>;
    break

    default:
    if (process.env.NODE_ENV !== 'production') {
      const str = `JsonEditor.Canvas.Canvas - Unexpected Datatype: ${type}`;
      throw TypeError(str);
    }
    //return <ErrorCmp />;

    content = <div>Error</div>;
  }
  return <Cursor id={null} expand={expand}>{content}</Cursor>;
}

const mapStateToProps = (state, { id }) => {
  if (typeof id === 'undefined') {
    id = state.jsonEditor.canvas.rootID;
  }
  if (id === null) {
    return { id: null, type: 'empty' };
  }
  const { type } = state.jsonEditor.canvas.byID[id];
  return { id, type };
}

const Canvas = connect(
  mapStateToProps
)(PureCanvas);

export default Canvas;
