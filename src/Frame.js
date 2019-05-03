import React from "react"
import { Route } from "react-router-dom"

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
  ({ classes, routes }) => (
    <Route
      children={({ location }) => {
        const n = routes.findIndex(route => route.match(location))
        const propsArray = routes.map((route, i) => route.render(i === n, location))
        const mainProps = propsArray[n]

        const drawer = mainProps.hideDrawer ? null : (
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
              {mainProps.title}
            </Typography>
            <Divider />
            {mainProps.nav}
          </Drawer>
        )
        return (
          <div className={classes.root}>
            {drawer}
            <main className={classes.content}>
              {propsArray.map(props => props.node)}
            </main>
          </div>
        )
      }}
    />
  )
)

export default Frame
