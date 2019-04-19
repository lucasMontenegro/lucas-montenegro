import React from 'react';
import { connect } from 'react-redux';
import { actions } from './state';
import Form from 'react-bootstrap/Form';

const { updateNumber } = actions;

export const PureNumberCmp = ({ id, value, onChange }) => (
  <Form.Control
    type="text"
    value={value}
    onChange={onChange}
    style={{ color: 'blue' }}
    />
);

const mapStateToProps = (state, { id }) => {
  const { value } = state.jsonEditor.canvas.byID[id];
  return { id, value };
}

const mapDispatchToProps = (dispatch, { id }) => {
  return {
    onChange: e => {
      dispatch(updateNumber(id, e.target.value))
    }
  };
}

const NumberCmp = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureNumberCmp);

export default NumberCmp;
