import React from 'react';
import Canvas from '../Canvas';
import OpenImportModal from './OpenImportModal';

export const PureJsonEditor = () => (
  <div>
    <h3>Json Editor</h3>
    <Canvas />
    <hr />
    <OpenImportModal />
  </div>
);

export default PureJsonEditor;
