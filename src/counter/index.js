import React from "react"
import Typography from "@material-ui/core/Typography"
import locales from "./locales"
import createLocalizedRoutes from "../createLocalizedRoutes"
import Frame from "../Frame"

class Counter extends React.Component {
  constructor (props) {
    super(props)
    this.state = { count: 0 }
    this.intervalID = setInterval(() => this.setState(state => ({ count: state.count + 1 })), 1000)
  }
  componentWillUnmount () {
    clearInterval(this.intervalID)
  }
  shouldComponentUpdate (nextProps, nextState) {
    return Boolean(this.props.match || nextProps.match)
  }
  render () {
    const { match, language, location } = this.props
    if (match) {
      const { render, frameProps } = locales[language]
      return (
        <Frame language={language} location={location} {...frameProps}>
          <Typography variant="body1">
            {render.textJsx(this.state.count)}
          </Typography>
        </Frame>
      )
    }
    return null
  }
}

export default createLocalizedRoutes({
  name: `counter`,
  makeInternationalMatch (language) {
    const re = new RegExp(`^/${language}/i\\+\\+/?$`)
    return location => re.test(location.pathname)
  },
  locales,
  Component: Counter,
})
