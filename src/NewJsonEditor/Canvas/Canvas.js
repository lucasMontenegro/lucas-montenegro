import React from 'react';
import { connect } from 'react-redux';
import Cursor from './Cursor';

export const PureRoot = ({ rootID }) => (
  <div>
    <Cursor id={null} />
    &nbsp;
    {rootID || (<em>empty</em>)}
  </div>
);

const mapStateToProps = state => {
  const { rootID } = state.jsonEditor.canvas;
  return { rootID };
}

const Root = connect(
  mapStateToProps
)(PureRoot);

export default Root;
