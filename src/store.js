import { createStore, combineReducers } from 'redux';
import { todoListRdr } from './TodoList';
import { jsonEditorRdr } from './JsonEditor';

const store = createStore(combineReducers({
  todoList: todoListRdr,
  jsonEditor: jsonEditorRdr
}));

export default store;
