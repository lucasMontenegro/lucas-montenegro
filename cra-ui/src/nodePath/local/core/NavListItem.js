import React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import { Link } from "local/core/links"
export default class NavListItem extends React.Component {
  constructor (props) {
    super(props)
    this.languageCode = `en`
    this.location = props.initialLocation
  }
  render () {
    const {
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
      <ListItem component="div">
        <ListItemAvatar><Avatar>{icon}</Avatar></ListItemAvatar>
        <ListItemText>
          <Link to={this.location}>{labels[this.languageCode]}</Link>
        </ListItemText>
      </ListItem>
    )
  }
}