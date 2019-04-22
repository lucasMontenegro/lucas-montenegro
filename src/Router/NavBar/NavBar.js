import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';

import Title from './Title';
import { LanguageButton, LanguageMenu } from './language-selection';
import { navStyles, NavButton, NavDrawer } from './navigation';
import LinkButton from './LinkButton';

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

const PureNavBar = props => {
  const {
    t,
    i18n,
    classes,
    isNavDrawerOpen,
    languageAnchorEl,
  } = props;

  const isLanguageMenuOpen = Boolean(languageAnchorEl);

  return (
    <div className={classes.root}>
      <AppBar position="static">
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
          <LinkButton
            to="/"
            color="inherit"
            aria-label="Open drawer"
          >
            <HomeIcon />
          </LinkButton>
          <LanguageButton
            className={classes.lastButton}
            open={isLanguageMenuOpen}
            onClick={props.handleLanguageMenuOpen}
          />
        </Toolbar>
      </AppBar>
      <LanguageMenu
        i18n={i18n}
        anchorEl={languageAnchorEl}
        open={isLanguageMenuOpen}
        onClose={props.handleLanguageMenuClose}
      />
      <NavDrawer
        open={isNavDrawerOpen}
        toggle={props.toggleNavDrawer}
        classes={classes}
      />
    </div>
  );
}

const LazyNavBar = withTranslation()(PureNavBar);

class NavBar extends React.Component {
  state = {
    isNavDrawerOpen: false,
    languageAnchorEl: null,
  };

  toggleNavDrawer = () => this.setState(state => ({
    ...state,
    isNavDrawerOpen: !state.isNavDrawerOpen
  }));

  handleLanguageMenuOpen = event => {
    this.setState({ languageAnchorEl: event.currentTarget });
  };

  handleLanguageMenuClose = () => {
    this.setState({ languageAnchorEl: null });
  };

  render() {
    const {
      toggleNavDrawer,
      handleLanguageMenuOpen,
      handleLanguageMenuClose,
    } = this;

    const {
      isNavDrawerOpen,
      languageAnchorEl,
    } = this.state;

    const {
      classes,
    } = this.props;

    const props = {
      toggleNavDrawer,
      isNavDrawerOpen,
      handleLanguageMenuOpen,
      handleLanguageMenuClose,
      languageAnchorEl,
      classes,
    };

    const fb = (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar />
        </AppBar>
      </div>
    );

    return (
      <Suspense fallback={fb}>
        <LazyNavBar {...props} />
      </Suspense>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
