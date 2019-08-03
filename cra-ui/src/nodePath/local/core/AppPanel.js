import React from "react"
import { withStyles } from "@material-ui/core/styles"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import { BlockLinkButton } from "local/core/links"
export const AppPanelView = withStyles(
  theme => ({
    buttonWrapper: {
      padding: theme.spacing(1),
    },
  })
)(
  function AppPanelView ({ classes, id, expanded, label, title, location, children }) {
    const panelId = `${id}-panel`
    return (
      <ExpansionPanel expanded={expanded} elevation={0}>
        <div className={classes.buttonWrapper}>
          <BlockLinkButton
            to={location}
            active={expanded}
            aria-controls={panelId}
          >
            {title}
          </BlockLinkButton>
        </div>
        <ExpansionPanelDetails id={panelId} aria-label={label}>{children}</ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
)
export default class AppPanel extends React.Component {
  constructor (props) {
    super(props)
    this.languageCode = `en`
    this.location = props.initialLocation
  }
  render () {
    const {
      id,
      title,
      match,
      languageCode: newLanguage,
      location,
      translations,
      labels,
      children,
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
      <AppPanelView
        id={id}
        expanded={match}
        label={labels[this.languageCode]}
        title={title}
        location={this.location}
      >
        {children}
      </AppPanelView>
    )
  }
}