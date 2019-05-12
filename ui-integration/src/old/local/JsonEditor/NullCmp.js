import React from 'react';
import Cursor from './Cursor';

export const PureNullCmp = ({ id }) => (
  <div>
    <Cursor id={id} />
    <span style={{ color: 'purple' }}>null</span>
  </div>
);

export default PureNullCmp;
