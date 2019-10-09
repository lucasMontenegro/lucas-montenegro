import React from "react"
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import Routes from "new/local/app/ui/Routes"
export const reducers = {
  core (state={}, action) {
    return state
  },
}
export default (
  <Provider store={createStore(combineReducers(reducers))}>
    <Routes />
  </Provider>
)