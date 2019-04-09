import React from 'react';

const StringCmp = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    style={{ color: 'green' }}
    />
);

export default StringCmp;