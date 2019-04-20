import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { actions } from '../Canvas/state';
import { CursorBtn, CollapseBtn } from './small-bits';
import styled from 'styled-components';

const Div = styled.div`
  margin: 1em 0;
`;

export const PureMultiLineCursor = props => {
  const {
    id,
    render: Child,
    cursorID,
    collapsed,
    toggleFocus,
    toggleCollapse
  } = props;
  if (collapsed) {
    return (
      <Container style={{ margin: '0' }}>
        <Row>
          <Col xs="auto">
            <CursorBtn focused={id === cursorID} onClick={toggleFocus} />
          </Col>
          <Col xs="auto">
            <CollapseBtn collapsed={true} onClick={toggleCollapse} />
          </Col>
          <Col>
            <Child id={id} collapsed={true} />
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container style={{ margin: '0' }}>
      <Row>
        <Col xs="auto">
          <CursorBtn focused={id === cursorID} onClick={toggleFocus} />
        </Col>
        <Col xs="auto">
          <CollapseBtn collapsed={false} onClick={toggleCollapse} />
        </Col>
      </Row>
      <Row>
        <Col as={Div}>
          <Child id={id} collapsed={false} />
        </Col>
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
  toggleElementCollapse
} = actions;

const mapDispatchToProps = (dispatch, { id }) => {
  return {
    toggleFocus: () => dispatch(updateCursor(id)),
    toggleCollapse: () => dispatch(toggleElementCollapse(id))
  };
}

const MultiLineCursor = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureMultiLineCursor);

export default MultiLineCursor;
