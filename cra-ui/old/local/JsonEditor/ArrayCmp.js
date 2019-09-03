import React from 'react';
import { connect } from 'react-redux';
import JsonSwitch from './JsonSwitch';
import Cursor from './Cursor';

export const PureArrayCmp = ({ id, kids }) => (
  <div>
    <Cursor id={id} />
    <ol style={{ border: '1px solid black' }}>
      {kids.map(kidID => <li key={kidID}><JsonSwitch id={kidID} /></li>)}
    </ol>
  </div>
);

const mapStateToProps = ({ jsonEditor }, { id }) => {
  const { kids } = jsonEditor.byID[id];
  return { id, kids };
}

const ArrayCmp = connect(
  mapStateToProps
)(PureArrayCmp);

export default ArrayCmp;
