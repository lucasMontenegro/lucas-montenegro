import React from "react"
import { Route } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import Typography from "@material-ui/core/Typography"
import { Button } from "local/links"
const AppPanel = withStyles(
  theme => ({
    root: {
      color: `white`,
      backgroundColor: `#232f3e`,
    },
    summary: {
      color: `white`,
    },
    anchor: {
      display: `block`,
      flex: `0 1 100%`,
    },
    button: {
      color: `white`,
      display: `block`,
      width: `100%`,
      textAlign: `left`,
    },
    activeButton: {
      color: `#4fc3f7`,
    },
  })
)(
  class AppPanel extends React.Component {
    render () {
      const { classes, id, match, to, label, children } = this.props
      const buttonClassName = match ? `${classes.button} ${classes.activeButton}` : classes.button
      return (
        <ExpansionPanel expanded={match} elevation={0} className={classes.root}>
          <ExpansionPanelSummary
            className={classes.summary}
            aria-controls={`${id}-panel-content`}
            id={`${id}-panel-header`}
          >
            <Button className={buttonClassName} anchorClassName={classes.anchor} to={to}>
              {label}
            </Button>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
        </ExpansionPanel>
      )
    }
  }
)
const panels = [
  {
    appName: `app1`,
    label: `App 1`,
  },
  {
    appName: `appb`,
    label: `App B`,
  },
]
const ExampleAppPanels = withStyles(
  theme => ({
    root: {
      padding: theme.spacing(2),
      minHeight: `100vh`,
      backgroundColor: `#18202c`,
      "& > *": {
        maxWidth: theme.spacing(100),
        margin: `${theme.spacing(2)}px auto`
      },
    },
  })
)(
  function ExampleAppPanels ({ classes, match }) {
    const activeApp = match.params.appName
    return (
      <div className={classes.root}>
        <div>
          {panels.map(panel => (
            <AppPanel
              key={panel.appName}
              id={panel.appName}
              match={panel.appName === activeApp}
              label={panel.label}
              to={`/examples/appPanel/${panel.appName}`}
            >
              <Typography>
                Lorem ipsum labore voluptate reprehenderit enim exercitation ea ullamco in exercitation dolore ex. Ea tempor pariatur et laboris adipisicing ut excepteur culpa velit proident excepteur officia ex ea. Lorem ipsum anim fugiat tempor labore sed ea nulla irure aliquip amet dolor.
              </Typography>
            </AppPanel>
          ))}
        </div>
      </div>
    )
  }
)
export default (<Route exact path="/examples/appPanel/:appName" component={ExampleAppPanels} />)