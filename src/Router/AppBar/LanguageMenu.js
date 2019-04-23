import React from 'react';
import { withTranslation } from 'react-i18next';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';
import supportedLanguages from './supported-languages.json';

const langs = Object.keys(supportedLanguages);

class LanguageMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = lang => () => {
    this.props.i18n.changeLanguage(lang);
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      className,
    } = this.props;
    const {
      anchorEl,
    } = this.state;
    const {
      handleOpen,
      handleClose,
    } = this;

    const isOpen = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          className={className}
          aria-owns={isOpen ? 'material-appbar' : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
          color="inherit"
        >
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isOpen}
          onClose={handleClose}
        >
          {langs.map(lang => (
            <MenuItem
              key={lang}
              onClick={handleClose(lang)}
            >
              {supportedLanguages[lang]}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

const LazyLanguageMenu = withTranslation()(LanguageMenu);

export default LazyLanguageMenu;
