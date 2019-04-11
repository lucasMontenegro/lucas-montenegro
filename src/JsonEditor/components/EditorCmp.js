import React from 'react';
import JsonCont from '../containers/JsonCont';
import KeyEditorCont from '../containers/KeyEditorCont';

const EditorCmp = ({ id }) => (
  <div>
    <h3>Json Editor</h3>
    <JsonCont id={id} />
    <KeyEditorCont />
  </div>
);

export default EditorCmp;