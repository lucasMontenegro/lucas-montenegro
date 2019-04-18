import React from 'react';
import { connect } from 'react-redux';
import Cursor from '../Cursor';
import Switch from './Switch';

export const PureCanvas = ({ rootID }) => (
  <div>
    <Cursor id={null} />
    &nbsp;
    {
      rootID === null
      ? <div><em>empty</em></div>
      : <Switch id={rootID} />
    }
  </div>
);

const mapStateToProps = state => {
  const { rootID } = state.jsonEditor.canvas;
  return { rootID };
}

const Canvas = connect(
  mapStateToProps
)(PureCanvas);

export default Canvas;
