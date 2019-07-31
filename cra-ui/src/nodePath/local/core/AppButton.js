import React from "react"
import { BlockLinkButton } from "local/core/links"
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
    return <BlockLinkButton to={this.location}>{labels[this.languageCode]}</BlockLinkButton>
  }
}