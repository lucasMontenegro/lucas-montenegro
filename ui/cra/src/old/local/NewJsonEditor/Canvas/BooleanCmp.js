import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { actions } from './state';

const { toggleBoolean } = actions;

const SizedBtn = styled.button`
  width: 100%;
  max-width: 40ch;
  margin-right: auto;
`;

export const PureBooleanCmp = ({ value, handleClick }) => (
  <Button
    as={SizedBtn}
    variant={value ? 'success' : 'danger'}
    onClick={handleClick}
    >
    {value ? 'True' : 'False'}
  </Button>
);

const mapStateToProps = (state, { id }) => {
  const { value } = state.jsonEditor.canvas.byID[id];
  return { value };
}

const mapDispatchToProps = (dispatch, { id }) => {
  return {
    handleClick: e => {
      dispatch(toggleBoolean(id))
    }
  };
}

const BooleanCmp = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureBooleanCmp);

export default BooleanCmp;
