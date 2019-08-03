import React from "react"
import { Route, Switch } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { Link, BlockLink } from "local/core/links"
const target = `/examples/core/links/TargetPage`
function P (props) {
  return (
    <Typography {...props} gutterBottom variant="body2" component="p">{props.children}</Typography>
  )
}
function TargetPage () {
  return <P id="message">it works</P>
}
const components = { Link, BlockLink }
const routes = [true, false].map(external => Object.keys(components).map(name => {
  const Component = components[name]
  const to = external ? undefined : target
  const href = external ? target : undefined
  return {
    name: external ? `External${name}` : name,
    Component: function LinkExampleBase () {
      return (
        <P>
          <Button id="top-button">TOP BUTTON</Button><br />
          <Component to={to} href={href} id="link">lorem ipsum</Component><br />
          <Button id="bottom-button">BOTTOM BUTTON</Button>
        </P>
      )
    }
  }
})).reduce((routes, arr) => routes.push(...arr) && routes, [])
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
              <Route key="TargetPage" exact path={target} component={TargetPage} />
              {routes.map(route => (
                <Route
                  key={route.name}
                  exact path={`/examples/core/links/${route.name}`}
                  component={route.Component}
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