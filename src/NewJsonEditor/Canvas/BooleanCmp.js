import React from 'react';
import { connect } from 'react-redux';
import { actions } from './state';
import Button from 'react-bootstrap/Button';

const { toggleBoolean } = actions;

export const PureBooleanCmp = ({ value, handleClick }) => (
  <Button
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
