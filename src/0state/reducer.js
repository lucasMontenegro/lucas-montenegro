import { combineReducers } from 'redux'
import * as todoList from './todo-list/reducers'

export default combineReducers({
  ...todoList
})
