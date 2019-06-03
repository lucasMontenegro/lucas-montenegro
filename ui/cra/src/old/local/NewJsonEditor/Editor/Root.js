import React from 'react';
import { connect } from 'react-redux';

export const PureRoot = ({ rootID }) => rootID
  ? <div>rootID</div>
  : <div><em>empty</em></div>;

const mapStateToProps = (state, ownProps) => {
  const { rootID } = state.jsonEditor;
  return { rootID };
}

const Root = connect(
  mapStateToProps
)(PureRoot);

export default Root;
