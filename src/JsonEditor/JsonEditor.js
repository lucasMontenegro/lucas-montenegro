import React from 'react';
import { connect } from 'react-redux';
import JsonSwitch from './JsonSwitch';
import ObjectKeyEditor from './ObjectKeyEditor';

export const PureJsonEditor = ({ id }) => (
  <div>
    <h3>Json Editor</h3>
    <JsonSwitch id={id} />
    <ObjectKeyEditor />
  </div>
);

const mapStateToProps = ({ jsonEditor: { id } }) => ({ id });

const JsonEditor = connect(
  mapStateToProps
)(PureJsonEditor);

export default JsonEditor;
