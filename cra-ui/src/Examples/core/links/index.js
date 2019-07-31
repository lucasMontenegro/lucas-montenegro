import React from "react"
import { Route, Switch } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { Link, LinkButton, BlockLinkButton } from "local/core/links"
import MenuExample from "./MenuExample"
const target = `/examples/core/links/TargetPage`
function P (props) {
  return <Typography gutterBottom variant="body2" component="p">{props.children}</Typography>
}
function TargetPage () {
  return <P><span id="message">it works</span></P>
}
function LinkExample () {
  return <P><Link to={target}>lorem ipsum</Link></P>
}
function LinkButtonExample () {
  return <P><LinkButton to={target} variant="outlined" color="primary">lorem ipsum</LinkButton></P>
}
function BlockLinkButtonExample () {
  return (
    <BlockLinkButton to={target} variant="outlined" color="primary">lorem ipsum</BlockLinkButton>
  )
}
const routes = [LinkExample, LinkButtonExample, BlockLinkButtonExample, MenuExample]
const LinkExamples = withStyles(
  theme => ({
    root: {
      paddingTop: theme.spacing(12),
    },
    paper: {
      maxWidth: theme.spacing(60),
      margin: `${theme.spacing(3)}px auto`,
      padding: theme.spacing(3, 2),
    },
    title: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  })
)(
  class LinkExamples extends React.Component {
    constructor (props) {
      super(props)
      this.id = Math.floor(Math.random() * 1000000).toString()
      this.renderCount = 1
    }
    render () {
      const { classes } = this.props
      return (
        <div className={classes.root}>
          <AppBar>
            <Toolbar>
              <Typography variant="h6" className={classes.title} id="instance-id">
                {`ID: ${this.id}`}
              </Typography>
              <Typography variant="h6" className={classes.title} id="render-count">
                {`render count: ${this.renderCount++}`}
              </Typography>
            </Toolbar>
          </AppBar>
          <Paper className={classes.paper}>
            <Switch>
              <Route exact path={target} component={TargetPage} />
              {routes.map(Component => (
                <Route
                  key={Component.name}
                  exact path={`/examples/core/links/${Component.name}`}
                  component={Component}
                />
              ))}
            </Switch>
          </Paper>
        </div>
      )
    }
  }
)
export default (<Route path="/examples/core/links" component={LinkExamples} />)