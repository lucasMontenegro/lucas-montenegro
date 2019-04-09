import { createStore, combineReducers } from 'redux';
import todoListRdr from './TodoList/reducer';
import jsonEditorRdr from './JsonEditor/reducer';

const store = createStore(combineReducers({
  todoList: todoListRdr,
  jsonEditor: jsonEditorRdr
}));

export default store;