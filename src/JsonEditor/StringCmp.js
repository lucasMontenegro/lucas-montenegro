import React from 'react';
import { connect } from 'react-redux';
import { actions } from './Editor/state';
import Cursor from './Cursor';

const { updateString } = actions;

export const PureStringCmp = ({ id, value, onChange }) => (
  <div>
    <Cursor id={id} />
    <input
      type="text"
      value={value}
      onChange={onChange}
      style={{ color: 'green' }}
      />
  </div>
);

const mapStateToProps = ({ jsonEditor }, { id }) => {
  const { value } = jsonEditor.byID[id];
  return { id, value };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: e => {
      dispatch(updateString(ownProps.id, e.target.value))
    }
  };
}

const StringCmp = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureStringCmp);

export default StringCmp;
