import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const drawerWidth = `24ch`;

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
  ({ classes, title, nav, children }) => {
    return (
      <div className={classes.root}>
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
        <main className={classes.content}>{children}</main>
      </div>
    );
  }
);

export default Frame;
