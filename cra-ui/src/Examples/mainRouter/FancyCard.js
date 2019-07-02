import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core/styles"
const FancyCard = withStyles(
  theme => ({
    paper: {
      maxWidth: 600,
      margin: `2em 3ch`,
      overflow: `hidden`,
    },
    titleBar: {
      borderBottom: `1px solid rgba(0, 0, 0, 0.12)`,
    },
    contentWrapper: {
      margin: `1em 1ch`,
    },
  })
)(
  function FancyCard({ classes, title, children }) {
    return (
      <Paper className={classes.paper}>
        {!title ? null : (
          <AppBar className={classes.titleBar} position="static" color="default" elevation={0}>
            <Toolbar>{title}</Toolbar>
          </AppBar>
        )}
        <div className={classes.contentWrapper}>
          <Typography color="textSecondary">
            {children}
          </Typography>
        </div>
      </Paper>
    )
  }
)
export default FancyCard