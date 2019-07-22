import React, { Fragment } from "react"
import { Route, Switch } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import MuiList from "@material-ui/core/List"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import WorkIcon from "@material-ui/icons/Work"
import { Button, ListItem, Link } from "local/links"
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
              <Route exact path="/examples/links/TargetPage" component={TargetPage} />
              {routes.map(r => (
                <Route
                  key={r.name}
                  exact path={`/examples/links/${r.name}`}
                  component={r.component}
                />
              ))}
            </Switch>
          </Paper>
        </div>
      )
    }
  }
)
export default (<Route path="/examples/links" component={LinkExamples} />)
function P (props) {
  return (
    <Typography gutterBottom variant="body2" component="p">
      {props.children}
    </Typography>
  )
}
function TargetPage (props) {
  return <P><span id="message">it works</span></P>
}
const target = `/examples/links/TargetPage`
const routes = []
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.setState(state => ({ ...state, count: state.count + 1 }))
  }
  render () {
    const { component: Component, ...other } = this.props
    return (
      <Fragment>
        <P><span id="click-count">{`click count: ${this.state.count}`}</span></P>
        <Component onClick={this.handleClick} {...other} />
      </Fragment>
    )
  }
}
function LinkExample ({ to, href }) {
  return <P><Link href={href} to={to}>lorem ipsum</Link></P>
}
function LocalLink () {
  return <LinkExample to={target} />
}
function ExternalLink () {
  return <LinkExample href={target} />
}
routes.push(
  { component: LocalLink, name: `LocalLink` },
  { component: ExternalLink, name: `ExternalLink` }
)
function ButtonExample ({ href, to, onClick }) {
  return (
    <P>
      <Button href={href} to={to} onClick={onClick} variant="outlined" color="primary">
        lorem ipsum
      </Button>
    </P>
  )
}
function SimpleButton () {
  return <Counter component={ButtonExample} />
}
function LocalLinkButton () {
  return <ButtonExample to={target} />
}
function ExternalLinkButton () {
  return <ButtonExample href={target} />
}
routes.push(
  { component: SimpleButton, name: `SimpleButton` },
  { component: LocalLinkButton, name: `LocalLinkButton` },
  { component: ExternalLinkButton, name: `ExternalLinkButton` }
)
function List ({ button, href, to, onClick }) {
  return (
    <MuiList disablePadding>
      <ListItem button={button} href={href} to={to} onClick={onClick}>
        <ListItemAvatar><Avatar><WorkIcon /></Avatar></ListItemAvatar>
        <ListItemText primary="lorem ipsum" secondary="Jan 9, 2014" />
      </ListItem>
    </MuiList>
  )
}
function SimpleList () {
  return <Counter component={List} />
}
function SimpleButtonList () {
  return <Counter component={List} button />
}
function LocalLinkList () {
  return <List to={target} />
}
function LocalLinkButtonList () {
  return <List button to={target} />
}
function ExternalLinkList () {
  return <List href={target} />
}
function ExternalLinkButtonList () {
  return <List button href={target} />
}
routes.push(
  { component: SimpleList, name: `SimpleList` },
  { component: SimpleButtonList, name: `SimpleButtonList` },
  { component: LocalLinkList, name: `LocalLinkList` },
  { component: LocalLinkButtonList, name: `LocalLinkButtonList` },
  { component: ExternalLinkList, name: `ExternalLinkList` },
  { component: ExternalLinkButtonList, name: `ExternalLinkButtonList` }
)
