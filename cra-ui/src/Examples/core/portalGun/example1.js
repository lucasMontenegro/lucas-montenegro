import React, { Fragment } from "react"
import { Route } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import PortalGun from "local/core/PortalGun"
const appNames = [`App1`, `App2`]
const mountingPoints = [`Left`, `Right`]
// CID === Component ID
const createCid = (i => () => (i++).toString())(0)
const PortalExample1 = withStyles(
  {
    root: {
      backgroundColor: `#2980b9`,
    },
  }
)(
  class PortalExample1 extends React.Component {
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
          <Div>Root CID: <span id="rootCid">{this.cid}</span></Div>
          <Div>
            <Button id="mountPortalGun" variant="contained" onClick={this.toggleMounted}>
              Mount/Unmount
            </Button>
          </Div>
          <Div>
            <Input
              id="rootInput"
              value={this.state.input}
              onChange={this.setInput}
            />
          </Div>
          {this.state.mounted && (
            <Div>
              <PortalGun
                appNames={appNames}
                mountingPoints={mountingPoints}
                Component={PortalCallback}
                other={{ rootProp: this.state.input }}
              />
            </Div>
          )}
        </Div>
      )
    }
  }
)
export default (
  <Route exact path="/examples/core/portalGun/example1" component={PortalExample1} />
)
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
      const { classes, portals, rootProp } = this.props
      return (
        <Div className={classes.root}>
          {appNames.map(appName => (
            <Client key={appName} appName={appName} portals={portals} rootProp={rootProp} />
          ))}
          <Div>Callback CID: <span id="callbackCid">{this.cid}</span></Div>
          <Div>
            <Button id="mountPortalContent" variant="contained" onClick={this.toggleMounted}>
              Mount/Unmount
            </Button>
          </Div>
          <Div>Root prop: <span id="callbackRootProp">{rootProp}</span></Div>
          {this.state.mounted && (
            <div className={classes.columns}>
              {mountingPoints.map(mountingPoint => (
                <Div key={mountingPoint}>
                  {appNames.map(appName => {
                    const { RedPortal } = portals[appName][mountingPoint]
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
      this.set = mountingPoints.reduce((set, mountingPoint) => {
        set[mountingPoint] = this.makeInputHandler(mountingPoint)
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
      const { classes, portals, appName, rootProp } = this.props
      return (
        <Fragment>
          {mountingPoints.map(mountingPoint => {
            const { BluePortal } = portals[appName][mountingPoint]
            const oposite = mountingPoint === `Left` ? `Right` : `Left`
            return (
              <BluePortal key={mountingPoint}>
                <Div className={classes.root}>
                  <Div>
                    Client CID: &nbsp;
                    <span id={`clientCid${mountingPoint}${appName}`}>{this.cid}</span>
                  </Div>
                  <Div>
                    Top prop: &nbsp;
                    <span id={`clientRootProp${mountingPoint}${appName}`}>{rootProp}</span>
                  </Div>
                  <Div>
                    {oposite} client prop: &nbsp;
                    <span id={`clientProp${mountingPoint}${appName}`}>{this.state[oposite]}</span>
                  </Div>
                  <Div>
                    <Input
                      id={`clientInput${mountingPoint}${appName}`}
                      value={this.state[mountingPoint]}
                      onChange={this.set[mountingPoint]}
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