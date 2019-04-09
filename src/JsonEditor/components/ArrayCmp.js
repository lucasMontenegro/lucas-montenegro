import React from 'react';
import JsonCont from '../containers/JsonCont';

const ArrayCmp = ({ kids }) => (
  <ol>
    {kids.map(id => <li key={id}><JsonCont id={id} /></li>)}
  </ol>
);

export default ArrayCmp;