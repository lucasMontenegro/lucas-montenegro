import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions } from '../Canvas/state';

const {
  updateCursor
} = actions;

export const PureCursor = ({ id, cursorID, handleClick }) => (
  <Button
    variant={id === cursorID ? 'primary' : 'secondary'}
    onClick={handleClick}
    >
    <FontAwesomeIcon icon={['fas', 'arrow-circle-right']} />
  </Button>
);

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  const { cursorID } = state.jsonEditor.canvas;
  return { cursorID, id };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps;
  return {
    handleClick: () => dispatch(updateCursor(id))
  };
}

const Cursor = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureCursor);

export default Cursor;
