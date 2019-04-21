import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';
import supportedLanguages from './supported-languages.json';

const languages = Object.keys(supportedLanguages);

export const LanguageMenu = ({ i18n, anchorEl, open, onClose }) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={open}
    onClose={onClose}
  >
    {languages.map(lang => (
      <MenuItem
        key={lang}
        onClick={() => {
          i18n.changeLanguage(lang);
          onClose();
        }}
      >
        {supportedLanguages[lang]}
      </MenuItem>
    ))}
  </Menu>
);

export const LanguageButton = ({ open, onClick }) => (
  <IconButton
    aria-owns={open ? 'material-appbar' : undefined}
    aria-haspopup="true"
    onClick={onClick}
    color="inherit"
  >
    <LanguageIcon />
  </IconButton>
);
