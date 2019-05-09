import React from "react"
import Typography from "@material-ui/core/Typography"
import locales from "./locales"

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
    const { match, language, Frame, frameProps } = this.props
    if (!match) {
      return null
    }
    const { title, textJsx } = locales.render[language]
    return (
      <Frame title={title} other={frameProps}>
        <Typography variant="body1">
          {textJsx(this.state.count)}
        </Typography>
      </Frame>
    )
  }
}

export default {
  Component: Counter,
  locales: locales.exports,
}
