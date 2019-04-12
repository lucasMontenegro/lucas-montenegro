import React from 'react';
import { connect } from 'react-redux';
import { actions } from './state';

const { updateString } = actions;

export const PureStringCmp = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    style={{ color: 'green' }}
    />
);

const mapStateToProps = (state, ownProps) => {
  const { value } = state.jsonEditor.byID[ownProps.id];
  return { value };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: e => {
      dispatch(updateString(ownProps.id, e.target.value))
    }
  };
}

const StringCmp = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureStringCmp);

export default StringCmp;
