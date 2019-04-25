import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import BaseAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';

import Title from './Title';
import LanguageMenu from './LanguageMenu';
import NavDrawer from './NavDrawer';
import { IconLink } from './links';

const styles = theme => ({
  root: {
    width: '100%',
  },
  firstButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  grow: {
    flexGrow: 1,
  },
  lastButton: {
    marginLeft: 20,
    marginRight: -12,
  },
});

const AppBar = ({ classes }) => (
  <Suspense fallback={
    <div className={classes.root}>
      <BaseAppBar position="static">
        <Toolbar />
      </BaseAppBar>
    </div>
  }>
    <BaseAppBar className={classes.root} position="static" elevation={0}>
      <Toolbar>
        <NavDrawer className={classes.firstButton} />
        <Typography
          variant="h6"
          color="inherit"
          noWrap
        >
          <Title />
        </Typography>
        <div className={classes.grow} />
        <IconLink
          to="/"
          color="inherit"
          aria-label="Open drawer"
        >
          <HomeIcon />
        </IconLink>
        <LanguageMenu className={classes.lastButton} />
      </Toolbar>
    </BaseAppBar>
  </Suspense>
);

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const StyledAppBar = withStyles(styles)(AppBar);

export default StyledAppBar;
