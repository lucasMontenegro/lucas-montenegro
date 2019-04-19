import React from 'react';
import { connect } from 'react-redux';
import { actions } from './state';
import Form from 'react-bootstrap/Form';

const { updateString } = actions;

export const PureStringCmp = ({ id, value, onChange }) => (
  <Form.Control
    as="textarea"
    value={value}
    onChange={onChange}
    style={{ color: 'green' }}
    />
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
