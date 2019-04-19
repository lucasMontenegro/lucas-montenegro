import React from 'react';
import { connect } from 'react-redux';
import { actions } from './state';
import Form from 'react-bootstrap/Form';

const { updateString } = actions;

export const PureStringCmp = ({ value, handleChange }) => (
  <Form.Control
    as="textarea"
    value={value}
    onChange={handleChange}
    style={{ color: 'green' }}
    />
);

const mapStateToProps = (state, { id }) => {
  const { value } = state.jsonEditor.canvas.byID[id];
  return { value };
}

const mapDispatchToProps = (dispatch, { id }) => {
  return {
    handleChange: e => {
      dispatch(updateString(id, e.target.value))
    }
  };
}

const StringCmp = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureStringCmp);

export default StringCmp;
