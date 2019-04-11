import React from 'react';

const KeyEditorCmp = ({ value, onChange, onSave }) => {
  if (value === null) return <div></div>;
  return (
    <div>
      <h4>Editing Object Key</h4>
      <input
        type="text"
        value={value}
        onChange={onChange}
        />
      <button type="button" onClick={onSave}>Save</button>
    </div>
  );
}

export default KeyEditorCmp;