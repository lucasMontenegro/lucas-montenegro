import { makeStyles } from "@material-ui/core/styles"
import React, { useState } from "react"
import Drawer from "@material-ui/core/Drawer"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import { FontAwesomeIcon } from "lib/react/fontAwesome"
import List from "@material-ui/core/List"
import { useRoutingContext } from "lib/react/routing/context"
import Link from "lib/react/links/Link"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
const useStyles = makeStyles(theme => ({
  drawerPaper: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(10),
  },
  appBar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    top: `auto`,
    bottom: 0,
  },
  toolbar: {
    justifyContent: `flex-end`,
    "& > button.icon-button": {
      minWidth: theme.spacing(6),
    },
    "& > div.flexible-space": {
      flexBasis: `100%`,
      flexShrink: 1,
    },
  },
  li: {
    color: theme.palette.primary.main,
  },
  activeLi: {
    color: theme.palette.type === `dark` ? `#33ccd7` : `#017982`,
    backgroundColor: theme.palette.type === `dark` ? `#272727` : `#f1f1f1`,
  },
  anchor: {
    color: `inherit`,
    display: `block`,
  },
  liIcon: {
    color: `inherit`,
    fontSize: theme.spacing(3),
    minWidth: theme.spacing(5),
    marginRight: theme.spacing(2),
  },
}), { name: `lib-react-main_bar-mobile_nav` })
function MobileNav (props) {
  const classes = useStyles()
  return (
    <Drawer
      variant="temporary"
      anchor="bottom"
      id="lib-react-main_bar-mobile_nav"
      open={props.isOpen}
      onClose={props.close}
      classes={{ paper: classes.drawerPaper }}
    >
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className="flexible-space" />
          <Tooltip
            title={props.t({
              en: () => `Close quick navigation`,
              es: () => `Cerrar navegación rápida`,
            })}
          >
            <IconButton
              edge="end"
              className="icon-button"
              aria-controls="lib-react-main_bar-mobile_nav"
              onClick={props.close}
            >
              <FontAwesomeIcon icon={[`fas`, `caret-down`]} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <nav
        aria-label={props.t({
          en: () => `Navigation links`,
          es: () => `Links de navegación`,
        })}
      >
        <List disablePadding>
          {useRoutingContext().clientLinks.map(link => (
            <li
              key={link.clientName}
              className={link.active ? `${classes.li} ${classes.activeLi}` : classes.li}
              aria-label={link.active ? props.t({
                en: () => `Current page`,
                es: () => `Página actual`,
              }) : undefined}
            >
              <Link className={classes.anchor} to={link.location} onClick={props.close}>
                <ListItem component="div">
                  <ListItemIcon className={classes.liIcon}>
                    <link.render.Icon t={props.t} />
                  </ListItemIcon>
                  <ListItemText>{props.t(link.render.text)}</ListItemText>
                </ListItem>
              </Link>
            </li>
          ))}
        </List>
      </nav>
    </Drawer>
  )
}
export default function useMobileNav (t) {
  const [isOpen, setOpenTo] = useState(false)
  return {
    node: <MobileNav t={t} isOpen={isOpen} close={() => setOpenTo(false)} />,
    open: () => setOpenTo(true),
  }
}