import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import BaseAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';

import Title from './Title';
import LanguageMenu from './LanguageMenu';
import { navStyles, NavButton, NavDrawer } from './navigation';
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
  ...navStyles,
});

const PureAppBar = props => {
  const {
    t,
    classes,
    isNavDrawerOpen,
  } = props;

  return (
    <div className={classes.root}>
      <BaseAppBar position="static">
        <Toolbar>
          <NavButton
            className={classes.firstButton}
            open={isNavDrawerOpen}
            onClick={props.toggleNavDrawer}
          />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
          >
            <Title t={t} />
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
      <NavDrawer
        open={isNavDrawerOpen}
        toggle={props.toggleNavDrawer}
        classes={classes}
      />
    </div>
  );
}

const LazyAppBar = withTranslation()(PureAppBar);

class AppBar extends React.Component {
  state = {
    isNavDrawerOpen: false,
  };

  toggleNavDrawer = () => this.setState(state => ({
    ...state,
    isNavDrawerOpen: !state.isNavDrawerOpen
  }));

  render() {
    const {
      toggleNavDrawer,
    } = this;
    const {
      isNavDrawerOpen,
    } = this.state;
    const {
      classes,
    } = this.props;

    const props = {
      toggleNavDrawer,
      isNavDrawerOpen,
      classes,
    };

    return (
      <Suspense fallback={
        <div className={classes.root}>
          <BaseAppBar position="static">
            <Toolbar />
          </BaseAppBar>
        </div>
      }>
        <LazyAppBar {...props} />
      </Suspense>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);
