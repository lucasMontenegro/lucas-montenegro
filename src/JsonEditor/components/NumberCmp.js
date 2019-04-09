import React from 'react';

const NumberCmp = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    style={{ color: 'blue' }}
    />
);

export default NumberCmp;