import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ListLinkItem } from './links';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';

const styles = {
  list: {
    width: 250,
  },
};

const projects = {
  '/todo': {
    exact: true,
    name: 'Todo List',
  },
};
const projectPaths = Object.keys(projects);

const NavDrawer = withStyles(styles)(
  class AppBar extends React.Component {
    state = {
      isOpen: false,
    };

    toggle = () => this.setState(state => ({
      isOpen: !state.isOpen
    }));

    render() {
      const {
        toggle,
      } = this;
      const {
        isOpen,
      } = this.state;
      const {
        className,
        classes,
      } = this.props;

      return (
        <div>
          <IconButton
            className={className}
            aria-owns={isOpen ? 'material-appbar' : undefined}
            aria-haspopup="true"
            onClick={toggle}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={isOpen} onClose={toggle}>
            <nav tabIndex={0} className={classes.list}>
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
          </Drawer>
        </div>
      );
    }
  }
);

export default NavDrawer;
