import React from "react"
import { withStyles } from "@material-ui/core/styles"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import { Link } from "local/core/links"
export default withStyles(theme => ({
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
}))(class NavListItem extends React.Component {
  constructor (props) {
    super(props)
    this.languageCode = `en`
    this.location = props.initialLocation
  }
  render () {
    const {
      classes,
      match,
      languageCode: newLanguage,
      location,
      translations,
      labels,
      icon,
    } = this.props
    const oldLanguage = this.languageCode
    if (match) {
      this.languageCode = newLanguage
      this.location = location
    } else if (oldLanguage !== newLanguage) {
      this.languageCode = newLanguage
      const intl = translations[oldLanguage].toIntl(this.location)
      this.location = translations[newLanguage].toLocal(intl)
    }
    return (
      <ListItem
        component="div"
        className={match ? `${classes.item} ${classes.itemActiveItem}` : classes.item}
      >
        <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
        <ListItemText classes={{ primary: classes.itemPrimary }}>
          <Link className={classes.link} to={this.location}>{labels[this.languageCode]}</Link>
        </ListItemText>
      </ListItem>
    )
  }
})