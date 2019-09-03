import React from 'react';
import { connect } from 'react-redux';
import { actions } from './Editor/state';
import Cursor from './Cursor';

const { updateNumber } = actions;

export const PureNumberCmp = ({ id, value, onChange }) => (
  <div>
    <Cursor id={id} />
    <input
      type="text"
      value={value}
      onChange={onChange}
      style={{ color: 'blue' }}
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
      dispatch(updateNumber(ownProps.id, e.target.value))
    }
  };
}

const NumberCmp = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureNumberCmp);

export default NumberCmp;
