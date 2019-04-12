import React from 'react';
import { connect } from 'react-redux';
import { actions } from './state';

const { updateNumber } = actions;

export const PureNumberCmp = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    style={{ color: 'blue' }}
    />
);

const mapStateToProps = (state, ownProps) => {
  const { value } = state.jsonEditor.byID[ownProps.id];
  return { value };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: e => {
      dispatch(updateNumber(ownProps.id, e.target.value))
    }
  };
}

const NumberCmp = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureNumberCmp);

export default NumberCmp;
