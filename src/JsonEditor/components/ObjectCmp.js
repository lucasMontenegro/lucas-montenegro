import React from 'react';
import JsonCont from '../containers/JsonCont';

const ObjectCmp = ({ kids }) => {
  const children = Object.keys(kids).sort().map(name => {
    const id = kids[name];
    return <li key={id}>{name}: <JsonCont id={id} /><br /><br /></li>;
  });
  return <ul>{children}</ul>;
}

export default ObjectCmp;