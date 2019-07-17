import React from "react"
import Frame from "local/Frame"
class FrameExample1 extends React.Component {
  constructor (props) {
    super(props)
    this.state = { appName: null }
    this.buttons = [
      {
        handleClick: this.makeGoto(`app1`),
        text: `go to app1`,
      },
      {
        handleClick: this.makeGoto(`app2`),
        text: `go to app2`,
      },
      {
        handleClick: this.makeGoto(null),
        text: `redirect`,
      },
    ]
  }
  makeGoto (appName) {
    return (function setAppName () {
      this.setState({ appName })
    }).bind(this)
  }
  render () {
    return (
      <Frame
        appName={this.state.appName}
        languageCode={this.props.match.params.languageCode}
        Dashboard={Dashboard}
        dashboardProps={{ buttons: this.buttons }}
        bodies={bodies}
        locations={locations}
        translateLocationFrom={translateLocationFrom}
        navLinks={navLinks}
      />
    )
  }
}
export default FrameExample1