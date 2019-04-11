import React from 'react';

const KeyEditorCmp = ({ value, unique, onChange, onSave, onCancel }) => {
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

export default KeyEditorCmp;