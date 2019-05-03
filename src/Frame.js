import React from "react"
import { Redirect } from "react-router-dom"

import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"

const drawerWidth = `24ch`

const Frame = withStyles(
  theme => ({
    root: {
      display: `flex`,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
)(
  ({ classes, redirect, hideDrawer, title, nav, children, other }) => {
    const drawer = hideDrawer || redirect ? null : (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Typography variant="subtitle1">
          LUCAS MONTENEGRO
        </Typography>
        <Typography variant="subtitle2">
          {title}
        </Typography>
        <Divider />
        {nav}
      </Drawer>
    )
    return (
      <div className={classes.root}>
        {drawer}
        <main className={classes.content}>
          {redirect && <Redirect to={other.to} />}
          {children}
          {other.hiddenChildren}
        </main>
      </div>
    )
  }
)

export default Frame
