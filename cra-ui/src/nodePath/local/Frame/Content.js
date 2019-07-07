import React, { Fragment } from "react"
import theme from "local/theme"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
const bodyBgColor = `#eaeff1`
const Content = withStyles(
  {
    header: {
      backgroundColor: theme.palette.primary.main,
    },
    bar: {
      zIndex: 0,
    },
    appBody: {
      backgroundColor: bodyBgColor,
    },
  }
)(
  ({ classes, subtitle, children, other: { languageCode } }) => (
    <Fragment>
      <div className={classes.header}>
        <AppBar
          component="div"
          className={classes.bar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs>
                <Typography color="inherit" variant="h5" component="h1">
                  Lucas Montenegro
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          className={classes.bar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs>
                <Typography color="inherit" variant="h6" component="h2">
                  {subtitle}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.appBody}><div>{children}</div></div>
    </Fragment>
  )
)
export default Content