import React, { Children, cloneElement } from "react"
export default class AppLocation extends React.Component {
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
      children,
      ...other
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
    const childrenProps = {
      ...other,
      match,
      languageCode: this.languageCode,
      location: this.location,
    }
    return Children.map(children, child => cloneElement(child, childrenProps))
  }
}