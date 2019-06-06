import { createStore, combineReducers } from "redux";

function reducer (state={}, action) {
  return state;
}

const store = createStore(combineReducers({
  rootApp: reducer,
}));

export default store;
