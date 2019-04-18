import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Cursor from '../Cursor';
import Switch from './Switch';

const EmptyWrapper = styled.div`
  color: gray;
  height: 10em;
  width: 16em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const PureCanvas = ({ rootID }) => (
  <Cursor id={null}>
    {
      rootID === null
      ? <EmptyWrapper><em>empty</em></EmptyWrapper>
      : <Switch id={rootID} />
    }
  </Cursor>
);

const mapStateToProps = state => {
  const { rootID } = state.jsonEditor.canvas;
  return { rootID };
}

const Canvas = connect(
  mapStateToProps
)(PureCanvas);

export default Canvas;
