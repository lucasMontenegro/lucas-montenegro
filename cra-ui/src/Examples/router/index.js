import React from "react"
import { Route } from "react-router-dom"
import Router from "local/Router"
import { ButtonLink } from "local/routerConnectedComponents"
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
                <ButtonLink to={url} variant="contained" color="primary">go</ButtonLink>
              </div>
            </div>
            <p>{`id: ${this.id}`}</p>
            <p>{`appName: ${props.appName}`}</p>
            <p>{`languageCode: ${props.languageCode}`}</p>
            <p>{`location.pathname: ${props.location.pathname}`}</p>
            <p>{`typeof routing: ${typeof props.routing}`}</p>
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