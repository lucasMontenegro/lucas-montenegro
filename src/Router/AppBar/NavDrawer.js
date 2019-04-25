import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ListLinkItem } from '../links';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
  list: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1rem',
    width: '25ch',
  },
  activeLink: {
    color: '#4fc3f7',
  },
};

const projects = {
  '/todo': {
    exact: true,
    name: 'Todo List',
  },
};
const projectPaths = Object.keys(projects);

const StyledNavDrawer = withStyles(styles)(
  class NavDrawer extends React.Component {
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
                <ListLinkItem
                  connected nav
                  key="home"
                  exact to="/"
                  onClick={toggle}
                  activeClassName={classes.activeLink}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListLinkItem>
                <ListLinkItem
                  key="sauce"
                  href="https://github.com/lucasMontenegro/lucas-montenegro/"
                  onClick={toggle}
                >
                  <ListItemIcon>
                    <FontAwesomeIcon icon={['fas', 'code']} />
                  </ListItemIcon>
                  <ListItemText primary="Source Code" />
                </ListLinkItem>
              </List>
              <Divider />
              <List
                subheader={
                  <ListSubheader color="inherit">My Projects</ListSubheader>
                }
              >
                {projectPaths.map(path => {
                  const project = projects[path];
                  return (
                    <ListLinkItem
                      connected nav
                      key={path}
                      to={path}
                      exact={project.exact}
                      onClick={toggle}
                      activeClassName={classes.activeLink}
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

export default StyledNavDrawer;
