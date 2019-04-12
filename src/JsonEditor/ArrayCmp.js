import React from 'react';
import { connect } from 'react-redux';
import JsonSwitch from './JsonSwitch';

export const PureArrayCmp = ({ kids }) => (
  <ol style={{ border: '1px solid black' }}>
    {kids.map(id => <li key={id}><JsonSwitch id={id} /></li>)}
  </ol>
);

const mapStateToProps = (state, ownProps) => {
  const { kids } = state.jsonEditor.byID[ownProps.id];
  return { kids };
}

const ArrayCmp = connect(
  mapStateToProps
)(PureArrayCmp);

export default ArrayCmp;
