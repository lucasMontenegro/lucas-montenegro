import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import { useRoutingContext } from "lib/react/routing/context"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Link from "lib/react/links/Link"
import PropTypes from "prop-types"
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
  liIcon: {
    color: `inherit`,
    fontSize: theme.spacing(2),
    minWidth: theme.spacing(5),
    marginRight: theme.spacing(2),
  },
  liText: {
    display: `block`,
    "& > span": {
      display: `block`,
    },
    "& > span > a": {
      color: `inherit`,
      display: `block`,
    },
  },
}), { name: `lib-react-app_drawer-nav` })
export default function Nav (props) {
  const { t, onClick } = props
  const classes = useStyles()
  return (
    <nav
      aria-label={t({
        en: () => `Navigation buttons`,
        es: () => `Botones de navegación`,
      })}
    >
      <List disablePadding>
        {useRoutingContext().clientLinks.map(link => (
          <ListItem
            key={link.clientName}
            className={link.active ? `${classes.li} ${classes.activeLi}` : classes.li}
          >
            <ListItemIcon className={classes.liIcon}><link.render.Icon t={t} /></ListItemIcon>
            <ListItemText className={classes.liText}>
              <Link
                to={link.location}
                aria-label={link.active ? t({
                  en: () => `Current page`,
                  es: () => `Página actual`,
                }) : undefined}
                onClick={onClick}
              >
                {t(link.render.text)}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </nav>
  )
}
Nav.propTypes = {
  t: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}