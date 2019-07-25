import React from "react"
import { Route } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { Outlet, Wiring } from "local/portals"
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
// CID === Component ID
const createCid = (i => () => (i++).toString())(0)
const Portal = withStyles(
  {
    root: {
      backgroundColor: `#2980b9`,
    },
  }
)(
  class Portal extends React.Component {
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
          <Div>Portal CID: <span id="portalCid">{this.cid}</span></Div>
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
              <Wiring
                Wrapper={Wrapper}
                components={components}
                portalProp={this.state.input}
              />
            </Div>
          )}
        </Div>
      )
    }
  }
)
export default (<Route path="/examples/portals" component={Portal} />)
const Wrapper = withStyles(
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
  class Wrapper extends React.Component {
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
      const { classes, left, right, portalProp } = this.props
      return (
        <Div className={classes.root}>
          <Div>Wrapper CID: <span id="wrapperCid">{this.cid}</span></Div>
          <Div>
            <Button id="mountWrapperContent" variant="contained" onClick={this.toggleMounted}>
              Mount/Unmount
            </Button>
          </Div>
          <Div>Portal prop: <span id="wrapperPortalProp">{portalProp}</span></Div>
          {this.state.mounted && (
            <div className={classes.columns}>
              <Div>{left}</Div>
              <Div>{right}</Div>
            </div>
          )}
        </Div>
      )
    }
  }
)
class Client extends React.Component {
  constructor (props) {
    super(props)
    this.cid = createCid()
    this.state = { left: ``, right: `` }
    this.setLeft = this.makeInputHandler(`left`)
    this.setRight = this.makeInputHandler(`right`)
  }
  makeInputHandler (side) {
    const self = this
    return function setInput (event) {
      self.setState({ [side]: event.target.value })
    }
  }
  render () {
    const { n, portals, portalProp } = this.props
    return (
      <Outlet
        portals={portals}
        left={
          <ClientView
            n={n}
            side="Left"
            cid={this.cid}
            portalProp={portalProp}
            clientProp={this.state.right}
            value={this.state.left}
            onChange={this.setLeft}
          />
        }
        right={
          <ClientView
            n={n}
            side="Right"
            cid={this.cid}
            portalProp={portalProp}
            clientProp={this.state.left}
            value={this.state.right}
            onChange={this.setRight}
          />
        }
      />
    )
  }
}
const ClientView = withStyles(
  {
    root: {
      backgroundColor: `#c0392b`,
    },
  }
)(
  function ClientView ({ classes, n, side, cid, portalProp, clientProp, value, onChange }) {
    return (
      <Div className={classes.root}>
        <Div>Client CID: <span id={`clientCid${side}${n}`}>{cid}</span></Div>
        <Div>Portal prop: <span id={`clientPortalProp${side}${n}`}>{portalProp}</span></Div>
        <Div>
          {side === `Left` ? `Right` : `Left`} client prop: &nbsp;
          <span id={`clientProp${side}${n}`}>{clientProp}</span>
        </Div>
        <Div>
          <Input
            id={`clientInput${side}${n}`}
            value={value}
            onChange={onChange}
          />
        </Div>
      </Div>
    )
  }
)
const components = [0, 1].map(n => function ClientWrapper (props) {
  return <Client {...props} n={n} />
})