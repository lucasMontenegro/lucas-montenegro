import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { actions } from './state';

const { updateNumber } = actions;

const Input = styled.input`
  width: 100%;
  max-width: 40ch;
  margin-right: auto;
`;

export const PureNumberCmp = ({ value, handleChange }) => (
  <Form.Control
    as={Input}
    type="text"
    value={value}
    onChange={handleChange}
    style={{ color: 'blue' }}
    />
);

const mapStateToProps = (state, { id }) => {
  const { value } = state.jsonEditor.canvas.byID[id];
  return { value };
}

const mapDispatchToProps = (dispatch, { id }) => {
  return {
    handleChange: e => {
      dispatch(updateNumber(id, e.target.value))
    }
  };
}

const NumberCmp = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureNumberCmp);

export default NumberCmp;
