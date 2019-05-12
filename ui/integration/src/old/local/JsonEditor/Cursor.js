import React from 'react';
import { connect } from 'react-redux';
import { actions } from './Editor/state';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { updateCursorID } = actions;

export const PureCursor = ({ active, handleClick }) => active
  ? (
      <Button variant="primary">
        <FontAwesomeIcon icon={['fas', 'arrow-circle-right']} />
      </Button>
    )
  : (
      <Button variant="secondary" onClick={handleClick}>
        <FontAwesomeIcon icon={['fas', 'arrow-circle-right']} />
      </Button>
    );

const mapStateToProps = ({ jsonEditor }, { id }) => 
  ({ active: jsonEditor.cursorID === id });

const mapDispatchToProps = (dispatch, { id }) => 
  ({ handleClick: e => dispatch(updateCursorID(id)) });

const Cursor = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureCursor);

export default Cursor;
