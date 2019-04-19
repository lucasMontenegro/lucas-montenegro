import React from 'react';
import { connect } from 'react-redux';
import { actions } from './state';

const { updateString } = actions;

export const PureStringCmp = ({ id, value, onChange }) => (
  <div>
    <input
      type="text"
      value={value}
      onChange={onChange}
      style={{ color: 'green' }}
      />
  </div>
);

const mapStateToProps = (state, { id }) => {
  const { value } = state.jsonEditor.canvas.byID[id];
  return { id, value };
}

const mapDispatchToProps = (dispatch, { id }) => {
  return {
    onChange: e => {
      dispatch(updateString(id, e.target.value))
    }
  };
}

const StringCmp = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureStringCmp);

export default StringCmp;
