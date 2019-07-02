import React from "react"
import Frame from "local/Frame"
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
    const { match, language, frameProps } = this.props
    if (!match) {
      return null
    }
    const { appTitle, textJsx } = locales.render[language]
    return (
      <Frame {...frameProps} subtitle={appTitle}>
        <FancyCard>{textJsx(this.state.count)}</FancyCard>
      </Frame>
    )
  }
}
export default {
  Component: Counter,
  locales: locales.exports,
}