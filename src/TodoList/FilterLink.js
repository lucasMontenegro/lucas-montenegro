import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from './state';

const { setVisibilityFilter } = actions;

export const PureFilterLink = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <button
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </button>
  );
}

PureFilterLink.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.todoList.visibilityFilter
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureFilterLink);

export default FilterLink;
