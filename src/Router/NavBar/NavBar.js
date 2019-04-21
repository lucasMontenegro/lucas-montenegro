import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import Title from './Title';
import { LanguageButton, LanguageMenu } from './language-selection';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const PureNavBar = props => {
  const {
    t,
    i18n,
    classes,
    languageAnchorEl
  } = props;

  const isLanguageMenuOpen = Boolean(languageAnchorEl);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
          >
            <Title t={t} />
          </Typography>
          <div className={classes.grow} />
          <LanguageButton
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
    </div>
  );
}

const LazyNavBar = withTranslation()(PureNavBar);

class NavBar extends React.Component {
  state = {
    languageAnchorEl: null
  };

  handleLanguageMenuOpen = event => {
    this.setState({ languageAnchorEl: event.currentTarget });
  };

  handleLanguageMenuClose = () => {
    this.setState({ languageAnchorEl: null });
  };

  render() {
    const {
      handleLanguageMenuOpen,
      handleLanguageMenuClose
    } = this;

    const {
      languageAnchorEl
    } = this.state;

    const {
      classes
    } = this.props;

    const props = {
      handleLanguageMenuOpen,
      handleLanguageMenuClose,
      languageAnchorEl,
      classes
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
