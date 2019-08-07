import React from "react"
import { makeStyles } from "@material-ui/styles"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import { Link } from "local/core/links"
const activeLabels = {
  en: `Active link`,
  es: `Link activo`,
}
const useStyles = makeStyles(theme => ({
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: `rgba(255, 255, 255, 0.7)`,
    "&:hover,&:focus": {
      backgroundColor: `rgba(255, 255, 255, 0.08)`,
    },
  },
  link: {
    color: `inherit`,
  },
  itemActiveItem: {
    color: `#4fc3f7`,
  },
  itemPrimary: {
    fontSize: `inherit`,
  },
  itemIcon: {
    minWidth: `auto`,
    marginRight: theme.spacing(2),
  },
}))
export default function NavLink ({ id, active, languageCode, location, labels, icons }) {
  const classes = useStyles()
  const activeLabel = active ? activeLabels[languageCode] : undefined
  const activeClassName = active ? `${classes.item} ${classes.itemActiveItem}` : classes.item
  return (
    <ListItem id={id} component="div" className={activeClassName}>
      <ListItemIcon className={classes.itemIcon}>{icons[languageCode]}</ListItemIcon>
      <ListItemText classes={{ primary: classes.itemPrimary }}>
        <Link className={classes.link} to={location} aria-label={activeLabel}>
          {labels[languageCode]}
        </Link>
      </ListItemText>
    </ListItem>
  )
}