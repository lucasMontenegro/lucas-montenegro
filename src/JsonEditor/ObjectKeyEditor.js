import React from 'react';
import { connect } from 'react-redux';
import { actions } from './state';

const { updateKey, saveKey, closeKeyEditor } = actions;

export const PureObjectKeyEditor = props => {
  const { value, unique, onChange, onSave, onCancel } = props;
  if (value === null) return <div></div>;
  return (
    <div>
      <h4>Editing Object Key</h4>
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={{ color: unique ? 'black' : 'red' }}
        />
      <button type="button" disabled={!unique} onClick={onSave}>Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </div>
  );
}

const mapStateToProps = state => {
  const { id, key, unique } = state.jsonEditor.keyEditor;
  if (!id) return { value: null };
  return { value: key || '', unique };
}

const mapDispatchToProps = dispatch => {
  return {
    onChange (e) {
      dispatch(updateKey(e.target.value));
    },
    onSave () {
      dispatch(saveKey());
    },
    onCancel () {
      dispatch(closeKeyEditor());
    }
  };
}

const ObjectKeyEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureObjectKeyEditor);

export default ObjectKeyEditor;
