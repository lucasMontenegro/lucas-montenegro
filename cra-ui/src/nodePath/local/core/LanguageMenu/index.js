import React, { Fragment } from "react"
import Menu from "@material-ui/core/Menu"
import IconButton from "@material-ui/core/IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MenuLink } from "local/core/links"
import translateLocation from "./translateLocation"
const links = [
  {
    languageCode: `en`,
    displayName: `English`,
  },
  {
    languageCode: `es`,
    displayName: `Español`,
  },
]
const labels = {
  en: `Language Menu`,
  es: `Menú de Idiomas`,
}
export default class LanguageMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = { anchorEl: null }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }
  open (event) {
    this.setState({ anchorEl: event.currentTarget })
  }
  close () {
    this.setState({ anchorEl: null })
  }
  render () {
    const { languageCode, location, translations } = this.props
    const { anchorEl } = this.state
    const isOpen = Boolean(anchorEl)
    if (isOpen && (!this.location || location !== this.location)) {
      this.location = location
      const locations = translateLocation(languageCode, location, translations)
      this.links = links.map(({ languageCode, displayName }) => ({
        key: languageCode,
        to: locations[languageCode],
        children: displayName,
      }))
    }
    return (
      <Fragment>
        <IconButton
          aria-label={labels[languageCode]}
          aria-controls="language-menu"
          aria-haspopup="true"
          onClick={this.open}
          color="inherit"
        >
          <FontAwesomeIcon icon={[`fas`, `language`]} />
        </IconButton>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isOpen}
          onClose={this.close}
        >
          {this.links && this.links.map(props => <MenuLink button {...props} />)}
        </Menu>
      </Fragment>
    )
  }
}