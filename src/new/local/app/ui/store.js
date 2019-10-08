const React = require("react")
const { createStore, combineReducers } = require("redux")
const { Provider } = require("react-redux")
const { default: routes } = require("new/local/app/ui/routes")
const reducers = exports.reducers = {
  core (state={}, action) {
    return state
  },
}
exports.default = (<Provider store={createStore(combineReducers(reducers))}>{routes}</Provider>)