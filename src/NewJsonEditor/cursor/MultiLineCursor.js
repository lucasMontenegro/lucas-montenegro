import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { actions } from '../Canvas/state';
import { CursorBtn, CollapseBtn } from './small-bits';

export const PureMultiLineCursor = props => {
  const {
    id,
    render,
    cursorID,
    collapsed,
    toggleFocus,
    toggleCollapse
  } = props;
  if (collapsed) {
    return (
      <Container style={{ margin: '0', padding: '0' }}>
        <Row>
          <Col xs={1}>
            <CursorBtn primary={id === cursorID} onClick={toggleFocus} />
          </Col>
          <Col xs={1}>
            <CollapseBtn collapsed={collapsed} onClick={toggleCollapse} />
          </Col>
          <Col xs={10}>{render(true)}</Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container style={{ margin: '0', padding: '0' }}>
      <Row>
        <Col xs={1}>
          <CursorBtn primary={id === cursorID} onClick={toggleFocus} />
        </Col>
        <Col xs={1}>
          <CollapseBtn collapsed={collapsed} onClick={toggleCollapse} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>{render(false)}</Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state, { id }) => {
  const { cursorID, byID } = state.jsonEditor.canvas;
  const { collapsed } = byID[id];
  return { cursorID, collapsed };
}

const {
  updateCursor,
  collapseElement
} = actions;

const mapDispatchToProps = (dispatch, { id }) => {
  return {
    toggleFocus: () => dispatch(updateCursor(id)),
    toggleCollapse: () => dispatch(collapseElement(id))
  };
}

const MultiLineCursor = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureMultiLineCursor);

export default MultiLineCursor;
