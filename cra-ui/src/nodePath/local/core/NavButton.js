import React from "react"
import { ListLink } from "local/core/links"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
export default class AppButton extends React.Component {
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
      <ListLink button to={this.location}>
        <ListItemAvatar><Avatar>{icon}</Avatar></ListItemAvatar>
        <ListItemText primary={labels[this.languageCode]} />
      </ListLink>
    )
  }
}