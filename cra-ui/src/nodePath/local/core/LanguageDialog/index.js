import React, { Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "local/core/links"
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
const titles = {
  en: `Select Language`,
  es: `Seleccione un Idioma`,
}
const closeText = {
  en: `CLOSE`,
  es: `CERRAR`,
}
const currentLanguageLabels = {
  en: `Current language`,
  es: `Idioma actual`,
}
export default withStyles(theme => ({
  dialogTitle: {
    display: `flex`,
    alignItems: `center`,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}))(class LanguageDialog extends React.Component {
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
    const { classes, languageCode, location, translations } = this.props
    const { anchorEl } = this.state
    const isOpen = Boolean(anchorEl)
    if (
        isOpen &&
        (!this.location || location !== this.location || languageCode !== this.languageCode)
      ) {
      this.location = location
      this.languageCode = languageCode
      this.locations = translateLocation(languageCode, location, translations)
    }
    const icon = <FontAwesomeIcon icon={[`fas`, `language`]} />
    return (
      <Fragment>
        <IconButton
          aria-label={labels[languageCode]}
          id="language-dialog-button"
          aria-controls="language-dialog"
          aria-haspopup="true"
          onClick={this.open}
          color="inherit"
        >
          {icon}
        </IconButton>
        <Dialog
          id="language-dialog"
          aria-labelledby="language-dialog-title"
          onClose={this.close}
          open={isOpen}
        >
          <DialogTitle
            id="language-dialog-title"
            disableTypography
            className={classes.dialogTitle}
          >
            <Avatar id="language-dialog-avatar" className={classes.avatar}>{icon}</Avatar>
            <Typography component="h2" variant="h6">{titles[languageCode]}</Typography>
          </DialogTitle>
          <DialogContent>
            <nav id="language-dialog-nav">
              <List>
                {this.locations && links.map(({ languageCode, displayName }) => {
                  const text = (
                    languageCode === this.languageCode ? (
                      <ListItemText aria-label={currentLanguageLabels[languageCode]}>
                        {displayName}
                      </ListItemText>
                    ) :
                    (
                      <ListItemText>
                        <Link to={this.locations[languageCode]}>{displayName}</Link>
                      </ListItemText>
                    )
                  )
                  return (
                    <ListItem key={languageCode}>{text}</ListItem>
                  )
                })}
              </List>
            </nav>
          </DialogContent>
          <DialogActions>
            <Button id="close-language-dialog" onClick={this.close} color="primary">
              {closeText[languageCode]}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
})