import React from "react"
import { Route } from "react-router-dom"
import Router from "local/Router"
import { Button } from "local/links"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import routing from "./routing"
const RouterExample = withStyles(
  theme => ({
    paper: {
      maxWidth: theme.spacing(60),
      margin: `${theme.spacing(3)}px auto`,
      padding: theme.spacing(3, 2),
    },
    form: {
      display: `flex`,
      alignItems: `flex-end`,
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
)(
  class RouterExample extends React.Component {
    constructor (props) {
      super(props)
      this.id = Math.floor(Math.random() * 1000000).toString()
      this.state = { url: `` }
      this.setUrl = this.setUrl.bind(this)
    }
    setUrl (event) {
      this.setState({ url: event.target.value })
    }
    render () {
      const { props, state: { url } } = this
      const { classes } = props
      return (
        <div>
          <Paper className={classes.paper}>
            <div className={classes.form}>
              <TextField
                id="url-input"
                label="Url"
                value={url}
                onChange={this.setUrl}
                margin="normal"
              />
              <div>
                <Button
                  id="nav-to-url"
                  to={url}
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  navigate
                </Button>
              </div>
            </div>
            <p id="router-instance-id">{`id: ${this.id}`}</p>
            <p id="router-app-name">{`appName: ${props.appName}`}</p>
            <p id="router-language-code">{`languageCode: ${props.languageCode}`}</p>
            <p id="router-pathname">{`location.pathname: ${props.location.pathname}`}</p>
            <p id="router-referrer">
              {`location.state.referrer.pathname: ${
                typeof props.location.state === `object`
                && typeof props.location.state.referrer === `object`
                && typeof props.location.state.referrer.pathname === `string`
                ? props.location.state.referrer.pathname : ``
              }`}
            </p>
          </Paper>
        </div>
      )
    }
  }
)
const router = (
  <Route
    path="/examples/router"
    render={props => {
      return(
        <Router
          location={props.location}
          Component={RouterExample}
          routing={routing}
        />
      )
    }}
  />
)
export default router