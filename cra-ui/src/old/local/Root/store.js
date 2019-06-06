import { createStore, combineReducers } from 'redux';
import { reducer } from './state';

const store = createStore(combineReducers({
  rootApp: reducer,
}));

export default store;
