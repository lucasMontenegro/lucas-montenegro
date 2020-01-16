import React from "react"
import { Route } from "react-router-dom"
import makeUniqueRef from "local/core/portals/makeUniqueRef"
import PropTypes from "prop-types"
function MakeUniqueRefExample (props) {
  const Component = (
    props.match.params.nodeEnv === `production` ? MakeUniqueRefProduction :
    MakeUniqueRefDevelopment
  )
  return [`1`, `2`, `3`].map(n => (<ErrorBoundary key={n} id={n}><Component /></ErrorBoundary>))
}
export default (
  <Route
    exact path="/examples/core/portals/makeUniqueRef/:nodeEnv"
    component={MakeUniqueRefExample}
  />
)
class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError (error) {
    return { error: error.message }
  }
  render () {
    return <div id={`boundary${this.props.id}`}>{this.state.error || this.props.children }</div>
  }
}
ErrorBoundary.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}
const useUniqueRefDevelopment = makeUniqueRef(`DevelopmentExample`)
function MakeUniqueRefDevelopment () {
  const unique = useUniqueRefDevelopment()
  return unique ? `unique` : `not unique`
}
const useUniqueRefProduction = makeUniqueRef(`ProductionExample`, `production`)
function MakeUniqueRefProduction () {
  const unique = useUniqueRefProduction()
  return unique ? `unique` : `not unique`
}