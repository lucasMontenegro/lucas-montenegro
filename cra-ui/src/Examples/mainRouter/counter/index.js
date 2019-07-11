import React from "react"
import locales from "./locales"
import FancyCard from "../FancyCard"
class Counter extends React.Component {
  constructor (props) {
    super(props)
    this.state = { count: 0 }
  }
  componentDidMount () {
    if (!this.intervalID) {
      this.intervalID = setInterval(() => {
        this.setState(state => ({ count: state.count + 1 }))
      }, 1000)
    }
  }
  componentWillUnmount () {
    clearInterval(this.intervalID)
  }
  shouldComponentUpdate (nextProps, nextState) {
    return Boolean(this.props.match || nextProps.match)
  }
  render () {
    const { match, languageCode, Wrapper, wrapperProps } = this.props
    if (!match) {
      return null
    }
    const { appTitle, textJsx } = locales.render[languageCode]
    return (
      <Wrapper subtitle={appTitle} other={wrapperProps}>
        <FancyCard>{textJsx(this.state.count)}</FancyCard>
      </Wrapper>
    )
  }
}
export default {
  AppBody: Counter,
  locales: locales.routerOptions,
}