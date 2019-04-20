import React from 'react';
import { connect } from 'react-redux';
import { SingleLineCursor, MultiLineCursor } from '../cursor';

import EmptyCmp from './EmptyCmp';
import NullCmp from './NullCmp';
import BooleanCmp from './BooleanCmp';
import StringCmp from './StringCmp';
import NumberCmp from './NumberCmp';
//import ArrayCmp from './ArrayCmp';
//import ObjectCmp from './ObjectCmp';

export const PureCanvas = ({ id, type }) => {
  switch (type) {
    case 'empty':
    return null;

    case 'emptyRoot':
    return (
      <SingleLineCursor id={id}>
        <EmptyCmp />
      </SingleLineCursor>
    );

    case 'null':
    return (
      <SingleLineCursor id={id}>
        <NullCmp />
      </SingleLineCursor>
    );

    case 'boolean':
    return (
      <SingleLineCursor id={id}>
        <BooleanCmp id={id} />
      </SingleLineCursor>
    );

    case 'string':
    return (
      <MultiLineCursor id={id} render={StringCmp} />
    );

    case 'number':
    return (
      <SingleLineCursor id={id}>
        <NumberCmp id={id} />
      </SingleLineCursor>
    );

    case 'array':
    //return <ArrayCmp id={id} />;
    return (
      <SingleLineCursor id={id}>
        <div>array: {id}</div>
      </SingleLineCursor>
    );

    case 'object':
    //return <ObjectCmp id={id} />;
    return (
      <SingleLineCursor id={id}>
        <div>object: {id}</div>
      </SingleLineCursor>
    );

    default:
    if (process.env.NODE_ENV !== 'production') {
      const str = `JsonEditor.Canvas.Canvas - Unexpected Datatype: ${type}`;
      throw TypeError(str);
    }
    //return <ErrorCmp />;

    return (
      <SingleLineCursor id={id}>
        <div>Error</div>
      </SingleLineCursor>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const { byID } = state.jsonEditor.canvas;
  switch (typeof id) {
    case 'string': {
      const { type } = byID[id];
      return { type };
    }
    case 'undefined': {
      const { rootID } = state.jsonEditor.canvas;
      if (typeof rootID !== 'string') {
        return { id: null, type: 'emptyRoot' };
      }
      const { type } = byID[rootID];
      return { id: rootID, type };
    }
    default:
    return { type: 'empty' };
  }
}

const Canvas = connect(
  mapStateToProps
)(PureCanvas);

export default Canvas;
