import React, { Fragment } from "react"
import theme from "local/theme"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MenuItemLink } from "local/routerConnectedComponents"
import { supportedLanguages, languages } from "./languages"
import translations from "./translations"
const languageLinks = supportedLanguages.map(languageCode => ({
  languageCode,
  text: languages[languageCode],
}))
class LanguageLinks extends React.Component {
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
    const {
      languageCode,
      appName,
      locations,
      translateLocationFrom,
    } = this.props
    const { anchorEl } = this.state
    const isOpen = Boolean(anchorEl)
    const location = locations[appName]
    if (isOpen && (!this.location || location !== this.location)) {
      this.location = location
      const translateTo = translateLocationFrom[languageCode]
      this.links = languageLinks.map(links => ({
        ...link,
        to: translateTo[link.languageCode][appName](location)
      }))
    }
    const { languageLinksLabel } = translations[languageCode]
    return (
      <div>
        <IconButton
          aria-label={languageLinksLabel}
          aria-controls="language-links"
          aria-haspopup="true"
          onClick={this.open}
          color="inherit"
        >
          <FontAwesomeIcon icon={[`fas`, `language`]} />
        </IconButton>
        <Menu
          id="language-links"
          anchorEl={anchorEl}
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
          {this.links && this.links.map(link => (
            <MenuItemLink key={link.languageCode} to={link.to}>
              {link.text}
            </MenuItemLink>
          ))}
        </Menu>
      </div>
    )
  }
}
const bodyBgColor = `#eaeff1`
const BodyWrapper = withStyles(
  {
    header: {
      backgroundColor: theme.palette.primary.main,
    },
    bar: {
      zIndex: 0,
    },
    appBody: {
      backgroundColor: bodyBgColor,
    },
    title: {
      flexGrow: 1,
    },
  }
)(
  function BodyWrapper (props) {
    const { classes } = props
    return (
      <Fragment>
        <div className={classes.header}>
          <AppBar
            component="div"
            className={classes.bar}
            color="primary"
            position="static"
            elevation={0}
          >
            <Toolbar>
              <Typography className={classes.title} color="inherit" variant="h5" component="h1">
                Lucas Montenegro
              </Typography>
              <LanguageLinks
                languageCode={props.languageCode}
                appName={props.appName}
                location={props.location}
                translateLocationFrom={props.translateLocationFrom}
              />
            </Toolbar>
          </AppBar>
          <AppBar
            component="div"
            className={classes.bar}
            color="primary"
            position="static"
            elevation={0}
          >
            <Toolbar>
              <Typography className={classes.title} color="inherit" variant="h6" component="h2">
                {props.subtitle}
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.appBody}><div>{props.children}</div></div>
      </Fragment>
    )
  }
)
export default BodyWrapper