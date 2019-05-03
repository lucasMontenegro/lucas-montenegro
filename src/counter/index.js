import React from "react"
import Typography from "@material-ui/core/Typography"
import locales from "./locales"
import createLocalizedRoutes from "../createLocalizedRoutes"
import Frame from "../Frame"
import Nav from "../Nav"

class Counter extends React.Component {
  constructor (props) {
    super(props)
    this.state = { count: 0 }
    this.intervalID = setInterval(() => this.setState(state => ({ count: state.count + 1 })), 1000)
  }
  componentWillUnmount () {
    clearInterval(this.intervalID)
  }
  /**/
  shouldComponentUpdate (nextProps, nextState) {
    const { hidden } = this.props
    return !hidden || hidden !== nextProps.hidden
  }
  /**/
  render () {
    /**/
    if (this.props.hidden) {
      return null
    }
    /**/
    const { renderText } = locales[this.props.language].render
    return (
      <Typography variant="body1">
        {renderText(this.state.count)}
      </Typography>
    )
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
  FrameComponent ({ redirect, childKey, language, navProps, frameProps }) {
    if (redirect) {
      return (
        <Frame
          redirect={true}
          other={frameProps}
        />
      )
    }
    const { title } = locales[language].render
    return (
      <Frame
        title={title}
        nav={<Nav other={navProps} />}
        other={frameProps}
      >
        <Counter key={childKey} language={language} />
      </Frame>
    )
  },
})
