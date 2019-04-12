import React from 'react';
import { connect } from 'react-redux';
import { actions } from './state';
import JsonSwitch from './JsonSwitch';

const { editObjectKey } = actions;

export const PureObjectCmp = ({ kids, onEdit }) => {
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
        <JsonSwitch id={id} /><br /><br />
      </li>
    );
  });
  return <ul style={{ border: '1px solid black' }}>{children}</ul>;
}

const mapStateToProps = (state, ownProps) => {
  const { kids } = state.jsonEditor.byID[ownProps.id];
  return { kids };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onEdit (key) {
      const { id } = ownProps;
      return () => dispatch(editObjectKey(id, key));
    }
  };
}

const ObjectCmp = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureObjectCmp);

export default ObjectCmp;
