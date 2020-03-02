import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import { useRoutingContext } from "lib/react/routing/context"
import Link from "lib/react/links/Link"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
const useStyles = makeStyles(theme => ({
  li: {
    color: theme.palette.primary.main,
    borderRight: `4px solid transparent`,
  },
  activeLi: {
    color: theme.palette.type === `dark` ? `#33ccd7` : `#017982`,
    backgroundColor: theme.palette.type === `dark` ? `#272727` : `#f1f1f1`,
    borderRight: `4px solid currentColor`,
  },
  anchor: {
    color: `inherit`,
    display: `block`,
  },
  muiLi: {
    [theme.breakpoints.up(`sm`)]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  liIcon: {
    color: `inherit`,
    fontSize: theme.spacing(3),
    minWidth: theme.spacing(5),
    marginRight: theme.spacing(1),
  },
}), { name: `lib-react-dashboard-nav` })
export default function Nav ({ t, onClick }) {
  const classes = useStyles()
  return (
    <nav
      aria-label={t({
        en: () => `Navigation links`,
        es: () => `Links de navegación`,
      })}
    >
      <List disablePadding>
        {useRoutingContext().clientLinks.map(link => (
          <li
            key={link.clientName}
            className={link.active ? `${classes.li} ${classes.activeLi}` : classes.li}
            aria-label={link.active ? t({
              en: () => `Current page`,
              es: () => `Página actual`,
            }) : undefined}
          >
            <Link to={link.location} onClick={onClick} className={classes.anchor}>
              <ListItem className={classes.muiLi} component="div">
                <ListItemIcon className={classes.liIcon}><link.render.Icon t={t} /></ListItemIcon>
                <ListItemText>{t(link.render.text)}</ListItemText>
              </ListItem>
            </Link>
          </li>
        ))}
      </List>
    </nav>
  )
}