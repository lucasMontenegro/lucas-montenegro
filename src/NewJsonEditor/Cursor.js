import React from 'react';
import { connect } from 'react-redux';
import { actions } from './Editor/state';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { updateCursorID } = actions;

export const PureCursor = ({ active, handleClick }) => (
  <Button
    variant={active ? 'primary' : 'secondary'}
    onClick={handleClick}
    >
    <FontAwesomeIcon icon={['fas', 'arrow-circle-right']} />
  </Button>
);

const mapStateToProps = ({ jsonEditor }, { id }) => 
  ({ active: jsonEditor.cursor.id === id });

const mapDispatchToProps = (dispatch, { id }) => 
  ({ handleClick: e => dispatch(updateCursorID(id)) });

const Cursor = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureCursor);

export default Cursor;
