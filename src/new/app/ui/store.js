import React from "react"
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import routes from "new/app/ui/routes"
export const reducers = {
  core (state={}, action) {
    return state
  },
}
export default (
  <Provider store={createStore(combineReducers(reducers))}>
    {routes}
  </Provider>
)