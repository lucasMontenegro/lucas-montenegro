import React from 'react';
import JsonCont from '../containers/JsonCont';

const EditorCmp = ({ id }) => (
  <div>
    <h3>Json Editor</h3>
    <JsonCont id={id} />
  </div>
);

export default EditorCmp;