import React from 'react';
import { connect } from 'react-redux';
import { actions } from './Editor/state';
import JsonSwitch from './JsonSwitch';
import { Button } from '../nuts-and-bolts';
import Cursor from './Cursor';

const { editObjectKey } = actions;

export const PureObjectCmp = ({ id, kids, onEdit }) => {
  const children = Object.keys(kids).sort().map(name => {
    const id = kids[name];
    if (!id) return <li><em>empty</em></li>;
    return (
      <li key={id}>
        <h4>
          {name}
          &emsp;
          <Button type="button" onClick={onEdit(name)}>Edit</Button>
        </h4>
        <JsonSwitch id={id} /><br /><br />
      </li>
    );
  });
  return (
    <div>
      <Cursor id={id} />
      <ul style={{ border: '1px solid black' }}>{children}</ul>
    </div>
  );
}

const mapStateToProps = ({ jsonEditor }, { id }) => {
  const { kids } = jsonEditor.byID[id];
  return { id, kids };
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
