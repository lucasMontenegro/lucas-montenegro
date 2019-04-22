import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

export const navStyles = {
  navList: {
    width: 250,
  },
};

export const NavDrawer = ({ open, toggle, classes }) => (
  <Drawer open={open} onClose={toggle}>
    <div
      tabIndex={0}
      role="button"
      onClick={toggle}
      onKeyDown={toggle}
    >
      <div className={console.log(classes.navList) || classes.navList}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  </Drawer>
);

export const NavButton = ({ open, onClick, ...props }) => (
  <IconButton
    {...props}
    aria-owns={open ? 'material-appbar' : undefined}
    aria-haspopup="true"
    onClick={onClick}
    color="inherit"
  >
    <MenuIcon />
  </IconButton>
);
