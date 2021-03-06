import React from "react"
import { makeStyles } from "@material-ui/styles"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import { Link } from "local/core/links"
import PropTypes from "prop-types"
import makeTranslations, { makeTranslationsPropType } from "local/makeTranslations"
import { languageCodePropType } from "local/supportedLanguages"
import makeLocationPropType from "local/core/propTypes/makeLocationPropType"
const activeLabels = makeTranslations({
  en: `Active link`,
  es: `Link activo`,
})
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
}), { name: `NavLink` })
export default function NavLink ({ linkId, active, languageCode, location, labels, icons }) {
  const classes = useStyles()
  const activeLabel = active ? activeLabels[languageCode] : undefined
  const activeClassName = active ? `${classes.item} ${classes.itemActiveItem}` : classes.item
  return (
    <ListItem component="div" className={activeClassName}>
      <ListItemIcon className={classes.itemIcon}>{icons[languageCode]}</ListItemIcon>
      <ListItemText classes={{ primary: classes.itemPrimary }}>
        <Link id={linkId} className={classes.link} to={location} aria-label={activeLabel}>
          {labels[languageCode]}
        </Link>
      </ListItemText>
    </ListItem>
  )
}
NavLink.propTypes = {
  linkId: PropTypes.string.isRequired,
  active: PropTypes.bool,
  languageCode: languageCodePropType.isRequired,
  location: makeLocationPropType().isRequired,
  labels: makeTranslationsPropType(PropTypes.string).isRequired,
  icons: makeTranslationsPropType(PropTypes.node).isRequired,
}