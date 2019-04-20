import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { actions } from './state';

const { updateString } = actions;

const HiddenString = styled.div`
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem;

  & > div {
    height: 1.5rem;
    overflow: hidden;
  }
  & > div > pre {
    font-size: 1rem;
    color: green;
    line-height: 1.5;
  }
`;

export const PureStringCmp = ({ collapsed, value, handleChange }) => {
  if (collapsed) {
    return <HiddenString><div><pre>{value}</pre></div></HiddenString>;
  }
  return (
    <Form.Control
      as="textarea"
      value={value}
      onChange={handleChange}
      style={{ color: 'green' }}
      />
  );
}

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
