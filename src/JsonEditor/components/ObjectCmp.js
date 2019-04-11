import React from 'react';
import JsonCont from '../containers/JsonCont';

const ObjectCmp = ({ kids, onEdit }) => {
  const children = Object.keys(kids).sort().map(name => {
    const id = kids[name];
    if (!id) return <li><em>empty</em></li>;
    return (
      <li key={id}>
        <h4>{name}</h4>
        <div><button type="button" onClick={onEdit(name)}>Edit</button></div>
        <JsonCont id={id} /><br /><br />
      </li>
    );
  });
  return <ul>{children}</ul>;
}

export default ObjectCmp;