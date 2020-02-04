import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import List from "@material-ui/core/List"
import { useRoutingContext } from "lib/react/routing/context"
import Tooltip from "@material-ui/core/Tooltip"
import Link from "lib/react/links/Link"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
const useStyles = makeStyles(theme => ({
  li: {
    color: theme.palette.primary.main,
  },
  activeLi: {
    color: theme.palette.type === `dark` ? `#33ccd7` : `#017982`,
    backgroundColor: theme.palette.type === `dark` ? `#272727` : `#f1f1f1`,
    borderLeft: `${theme.spacing(0.5)}px solid transparent`,
    borderRight: `${theme.spacing(0.5)}px solid currentColor`,
  },
  anchor: {
    display: `block`,
    color: `inherit`,
  },
  muiLi: {
    justifyContent: `center`,
  },
  liIcon: {
    color: `inherit`,
    minWidth: `initial`,
  },
}), { name: `lib-react-main_bar-tablet_nav` })
export default function TabletNav ({ t }) {
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
            <Tooltip title={t(link.render.text)}>
              <Link className={classes.anchor} to={link.location}>
                <ListItem component="div" className={classes.muiLi}>
                  <ListItemIcon className={classes.liIcon}>
                    <link.render.Icon t={t} />
                  </ListItemIcon>
                </ListItem>
              </Link>
            </Tooltip>
          </li>
        ))}
      </List>
    </nav>
  )
}