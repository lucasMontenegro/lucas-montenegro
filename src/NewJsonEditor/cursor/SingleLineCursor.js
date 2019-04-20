import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { actions } from '../Canvas/state';
import { CursorBtn } from './small-bits';

export const PureSingleLineCursor = props => {
  const { id, children, cursorID, toggleFocus } = props;
  return (
    <Container style={{ margin: '0' }}>
      <Row>
        <Col xs="auto">
          <CursorBtn focused={id === cursorID} onClick={toggleFocus} />
        </Col>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state, { id }) => {
  const { cursorID } = state.jsonEditor.canvas;
  return { id, cursorID };
}

const {
  updateCursor
} = actions;

const mapDispatchToProps = (dispatch, { id }) => {
  return {
    toggleFocus: () => dispatch(updateCursor(id))
  };
}

const SingleLineCursor = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureSingleLineCursor);

export default SingleLineCursor;
