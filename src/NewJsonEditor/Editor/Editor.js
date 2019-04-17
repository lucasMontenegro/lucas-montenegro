import React from 'react';
import Root from '../Root';
import ObjectKeyEditor from './ObjectKeyEditor';
import OpenImportModal from './OpenImportModal';
import ImportModal from './ImportModal';

export const PureJsonEditor = () => (
  <div>
    <h3>Json Editor</h3>
    <Root />
    <ObjectKeyEditor />
    <OpenImportModal />
    <ImportModal />
  </div>
);

export default PureJsonEditor;
