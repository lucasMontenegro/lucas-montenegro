import React, { Fragment } from "react"
import { Route } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import PortalGun from "local/core/PortalGun"
const appNames = [`App1`, `App2`]
const mountPoints = [`Left`, `Right`]
// CID === Component ID
const createCid = (i => () => (i++).toString())(0)
const PortalExample = withStyles(
  {
    root: {
      backgroundColor: `#2980b9`,
    },
  }
)(
  class PortalExample extends React.Component {
    constructor (props) {
      super(props)
      this.cid = createCid()
      this.state = { input: ``, mounted: true }
      this.setInput = this.setInput.bind(this)
      this.toggleMounted = this.toggleMounted.bind(this)
    }
    setInput (event) {
      this.setState({ input: event.target.value })
    }
    toggleMounted () {
      this.setState(state => ({ ...state, mounted: !state.mounted }))
    }
    render () {
      const { classes } = this.props
      return (
        <Div className={classes.root}>
          <Div>Portal CID: <span id="topCid">{this.cid}</span></Div>
          <Div>
            <Button id="mountPortal" variant="contained" onClick={this.toggleMounted}>
              Mount/Unmount
            </Button>
          </Div>
          <Div>
            <Input
              id="portalInput"
              value={this.state.input}
              onChange={this.setInput}
            />
          </Div>
          {this.state.mounted && (
            <Div>
              <PortalGun
                appNames={appNames}
                mountPoints={mountPoints}
                Component={PortalCallback}
                other={{ topProp: this.state.input }}
              />
            </Div>
          )}
        </Div>
      )
    }
  }
)
export default (<Route path="/examples/core/PortalGun" component={PortalExample} />)
const PortalCallback = withStyles(
  {
    root: {
      backgroundColor: `#27ae60`,
    },
    columns: {
      display: `flex`,
      "& > *": {
        flex: `0 1 100%`,
      },
    },
  }
)(
  class PortalCallback extends React.Component {
    constructor (props) {
      super(props)
      this.cid = createCid()
      this.state = { mounted: true }
      this.toggleMounted = this.toggleMounted.bind(this)
    }
    toggleMounted () {
      this.setState(state => ({ ...state, mounted: !state.mounted }))
    }
    render () {
      const { classes, portals, topProp } = this.props
      return (
        <Div className={classes.root}>
          {appNames.map(appName => (
            <Client key={appName} appName={appName} portals={portals} topProp={topProp} />
          ))}
          <Div>Callback CID: <span id="callbackCid">{this.cid}</span></Div>
          <Div>
            <Button id="mountCallbackContent" variant="contained" onClick={this.toggleMounted}>
              Mount/Unmount
            </Button>
          </Div>
          <Div>Top prop: <span id="callbackPortalProp">{topProp}</span></Div>
          {this.state.mounted && (
            <div className={classes.columns}>
              {mountPoints.map(mountPoint => (
                <Div key={mountPoint}>
                  {appNames.map(appName => {
                    const { RedPortal } = portals[appName][mountPoint]
                    return <RedPortal key={appName} Component="div" />
                  })}
                </Div>
              ))}
            </div>
          )}
        </Div>
      )
    }
  }
)
const Client = withStyles(
  {
    root: {
      backgroundColor: `#c0392b`,
    },
  }
)(
  class Client extends React.Component {
    constructor (props) {
      super(props)
      this.cid = createCid()
      this.state = { Left: ``, Right: `` }
      this.set = mountPoints.reduce((set, mountPoint) => {
        set[mountPoint] = this.makeInputHandler(mountPoint)
        return set
      }, {})
    }
    makeInputHandler (side) {
      const self = this
      return function setInput (event) {
        self.setState({ [side]: event.target.value })
      }
    }
    render () {
      const { classes, portals, appName, topProp } = this.props
      return (
        <Fragment>
          {mountPoints.map(mountPoint => {
            const { BluePortal } = portals[appName][mountPoint]
            const oposite = mountPoint === `Left` ? `Right` : `Left`
            return (
              <BluePortal key={mountPoint}>
                <Div className={classes.root}>
                  <Div>
                    Client CID: &nbsp;
                    <span id={`clientCid${mountPoint}${appName}`}>{this.cid}</span>
                  </Div>
                  <Div>
                    Top prop: &nbsp;
                    <span id={`clientPortalProp${mountPoint}${appName}`}>{topProp}</span>
                  </Div>
                  <Div>
                    {oposite} client prop: &nbsp;
                    <span id={`clientProp${mountPoint}${appName}`}>{this.state[oposite]}</span>
                  </Div>
                  <Div>
                    <Input
                      id={`clientInput${mountPoint}${appName}`}
                      value={this.state[mountPoint]}
                      onChange={this.set[mountPoint]}
                    />
                  </Div>
                </Div>
              </BluePortal>
            )
          })}
        </Fragment>
      )
    }
  }
)
const Input = withStyles(
  {
    root: {
      width: `200px`,
      padding: `10px`,
    },
    textField: {
      width: `100%`,
    },
  }
)(
  function Input ({ classes, ...other }) {
    return (
      <Paper className={classes.root} elevation={2}>
        <TextField {...other} className={classes.textField} />
      </Paper>
    )
  }
)
const Div = withStyles(
  {
    root: {
      border: `10px solid transparent`,
      color: `white`,
      fontSize: `16px`,
    },
  }
)(
  function Div ({ classes, className, ...other }) {
    return <div {...other} className={className ? `${classes.root} ${className}` : classes.root} />
  }
)