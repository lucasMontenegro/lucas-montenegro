import React from "react"
import { withStyles } from "@material-ui/core/styles"
import theme from "local/theme"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import { NavListItemLink } from "local/routerConnectedComponents"
const MenuList = withStyles(
  {
    item: {
      paddingTop: 1,
      paddingBottom: 1,
      color: 'rgba(255, 255, 255, 0.7)',
      '&:hover,&:focus': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      },
    },
    itemCategory: {
      backgroundColor: '#232f3e',
      boxShadow: '0 -1px 0 #404854 inset',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    categoryHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
      color: theme.palette.common.white,
    },
    itemPrimary: {
      fontSize: 'inherit',
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    activeLink: {
      color: `#4fc3f7`,
    },
  }
)(
  ({ classes, navLinks, languageLinks, onClick }) => (
    <List disablePadding>
      <ListItem className={classes.categoryHeader}>
        <ListItemText classes={{ primary: classes.categoryHeaderPrimary }}>
          Apps
        </ListItemText>
      </ListItem>
      {navLinks.map(({ text, to }) => (
        <NavListItemLink
          exact to={to}
          key={to}
          className={classes.item}
          activeClassName={classes.activeLink}
          onClick={onClick}
        >
          <ListItemText classes={{ primary: classes.itemPrimary }}>
            {text}
          </ListItemText>
        </NavListItemLink>
      ))}
      <Divider className={classes.divider} />
      <ListItem className={classes.categoryHeader}>
        <ListItemText classes={{ primary: classes.categoryHeaderPrimary }}>
          Languages
        </ListItemText>
      </ListItem>
      {languageLinks.map(({ text, to }) => (
        <NavListItemLink
          exact to={to}
          key={to}
          className={classes.item}
          activeClassName={classes.activeLink}
          onClick={onClick}
        >
          <ListItemText classes={{ primary: classes.itemPrimary }}>
            {text}
          </ListItemText>
        </NavListItemLink>
      ))}
    </List>
  )
)
export default MenuList