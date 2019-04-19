import { createStore, combineReducers } from 'redux';
import { todoListRdr } from './TodoList';
import { reducer as jsonEditorRdr } from './NewJsonEditor/state';

const store = createStore(combineReducers({
  todoList: todoListRdr,
  jsonEditor: jsonEditorRdr
}));

export default store;
