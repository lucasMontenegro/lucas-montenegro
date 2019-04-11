import React from 'react';
import JsonCont from '../containers/JsonCont';

const ObjectCmp = ({ kids, onEdit }) => {
  const children = Object.keys(kids).sort().map(name => {
    const id = kids[name];
    if (!id) return <li><em>empty</em></li>;
    return (
      <li key={id}>
        <h4>
          {name}
          &emsp;
          <button type="button" onClick={onEdit(name)}>Edit</button>
        </h4>
        <JsonCont id={id} /><br /><br />
      </li>
    );
  });
  return <ul style={{ border: '1px solid black' }}>{children}</ul>;
}

export default ObjectCmp;