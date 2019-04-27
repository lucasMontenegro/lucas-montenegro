import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import { actions } from '../Canvas/state';
import { CursorBtn } from './small-bits';

const Wrapper = styled.div`
  display: grid;
  grid: auto / 3em auto
  align-items: start;
  grid-gap: 1ch;
  padding: 1ch;

  border: 0.1em solid gray;
  border-radius: 0.25rem;
`;

const Oneliner = styled.div`
  display: grid;
  grid: auto / 3em auto
  align-items: start;
  grid-gap: 1ch;
  padding: 1ch;

  border: 0.1em solid gray;
  border-radius: 0.25rem;
`;

export const PureCursor = props => {
  const {
    id,
    cursorID,
    handleClick,
    expand,
    children
  } = props;
  const content = (
    <Wrapper>
      <CursorBtn primary={id === cursorID} onClick={handleClick} />
      <div>{children}</div>
    </Wrapper>
  );
  if (expand) return content;
  return (
    <Container style={{ margin: '0', padding: '0' }}>
      {content}
    </Container>
  );
}

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
