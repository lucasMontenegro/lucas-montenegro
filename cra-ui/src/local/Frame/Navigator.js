import React from "react"
import { withStyles } from "@material-ui/core/styles"
import theme from "local/theme"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import { NavListItemLink } from "local/routerConnectedComponents"
const Navigator = withStyles(
  {
    item: {
      paddingTop: 1,
      paddingBottom: 1,
      color: `rgba(255, 255, 255, 0.7)`,
      "&:hover,&:focus": {
        backgroundColor: `rgba(255, 255, 255, 0.08)`,
      },
    },
    itemPrimary: {
      fontSize: `inherit`,
    },
    itemIcon: {
      minWidth: `auto`,
      marginRight: theme.spacing(2),
    },
    activeLink: {
      color: `#4fc3f7`,
    },
  }
)(
  function Navigator (props) {
    const { classes } = props
    return (
      <div>
        <nav>
          <List disablePadding>
            {props.navLinks.map(({ appName, text, icon }) => (
              <NavListItemLink
                key={appName}
                exact to={props.locations[appName]}
                className={classes.item}
                activeClassName={classes.activeLink}
                onClick={props.onClick}
              >
                <ListItemIcon className={classes.itemIcon}>
                  {icon}
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.itemPrimary }}>
                  {text}
                </ListItemText>
              </NavListItemLink>
            ))}
          </List>
        </nav>
        {props.children}
      </div>
    )
  }
)
export default Navigator