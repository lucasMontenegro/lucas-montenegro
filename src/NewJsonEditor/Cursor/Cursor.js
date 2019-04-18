import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { actions } from '../Canvas/state';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.2em;

  & > * {
    margin: 0.2em;
  }
`;

const Border = styled.div`
  border: 0.1em solid gray;
  border-radius: 0.25rem;
  padding: 0.5em;
`;

export const PureCursor = ({ id, cursorID, handleClick, children }) => (
  <Wrapper>
    <Button
      variant={id === cursorID ? 'primary' : 'secondary'}
      onClick={handleClick}
      >
      <FontAwesomeIcon icon={['fas', 'arrow-circle-right']} />
    </Button>
    <Border>{children}</Border>
  </Wrapper>
);

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  const { cursorID } = state.jsonEditor.canvas;
  return { cursorID, id };
}

const {
  updateCursor
} = actions;
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
