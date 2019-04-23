import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';

import { ListLinkItem } from './links';

export const navStyles = {
  navList: {
    width: 250,
  },
};

const projects = {
  '/todo': {
    exact: true,
    name: 'Todo List',
  },
}
const projectPaths = Object.keys(projects);

export const NavDrawer = ({ open, toggle, classes }) => (
  <Drawer open={open} onClose={toggle}>
    <div tabIndex={0}>
      <nav className={classes.navList}>
        <List>
          <ListLinkItem key="home" to="/" onClick={toggle}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListLinkItem>
        </List>
        <Divider />
        <List
          subheader={
            <ListSubheader>My Projects</ListSubheader>
          }
        >
          {projectPaths.map(path => {
            const project = projects[path];
            return (
              <ListLinkItem
                key={path}
                to={path}
                exact={project.exact}
                onClick={toggle}
              >
                <ListItemText primary={project.name} />
              </ListLinkItem>
            );
          })}
        </List>
      </nav>
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
