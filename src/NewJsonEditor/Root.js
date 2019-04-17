import React from 'react';
import { connect } from 'react-redux';
import Cursor from './Cursor';

export const PureRoot = ({ rootID }) => (
  <div>
    <Cursor id={rootID} />
    &nbsp;
    {rootID || (<em>empty</em>)}
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const { rootID } = state.jsonEditor;
  return { rootID };
}

const Root = connect(
  mapStateToProps
)(PureRoot);

export default Root;
