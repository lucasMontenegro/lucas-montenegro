import React from 'react';
import styled from 'styled-components';
import Canvas from '../Canvas';
import OpenImportModal from './OpenImportModal';

const Wrapper = styled.div`
  padding: 1em;
`;

export const PureJsonEditor = () => (
  <Wrapper>
    <h3>Json Editor</h3>
    <Canvas />
    <hr />
    <OpenImportModal />
  </Wrapper>
);

export default PureJsonEditor;
