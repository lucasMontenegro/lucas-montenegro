import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoUL from '../components/TodoUL'

const getVisibleTodos = (todos, filter) => {
  // eslint-disable-next-line
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = ({ todoList: { todos, visibilityFilter } }) => {
  return {
    todos: getVisibleTodos(todos, visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoUL)

export default VisibleTodoList