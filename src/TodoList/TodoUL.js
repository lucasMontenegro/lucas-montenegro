import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Todo from './Todo';
import { actions } from './state';

const { toggleTodo } = actions;

export const PureTodoUL = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo, index) => (
      <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
    ))}
  </ul>
);

PureTodoUL.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

const getVisibleTodos = (todos, filter) => {
  // eslint-disable-next-line
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
}

const mapStateToProps = ({ todoList: { todos, visibilityFilter } }) => {
  return {
    todos: getVisibleTodos(todos, visibilityFilter)
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id));
    }
  };
}

const TodoUL = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureTodoUL);

export default TodoUL;
