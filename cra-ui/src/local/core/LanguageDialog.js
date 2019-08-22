import React, { Fragment } from "react"
import { makeStyles } from "@material-ui/styles"
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
import makeTranslations from "local/makeTranslations"
const links = makeTranslations({
  en: `English`,
  es: `Español`,
}, `toArray`)
const labels = makeTranslations({
  en: `Language Menu`,
  es: `Menú de Idiomas`,
})
const titles = makeTranslations({
  en: `Select Language`,
  es: `Seleccione un Idioma`,
})
const closeText = makeTranslations({
  en: `CLOSE`,
  es: `CERRAR`,
})
const activeLinkLabels = makeTranslations({
  en: `Current language`,
  es: `Idioma actual`,
})
const useStyles = makeStyles(theme => ({
  dialogTitle: {
    display: `flex`,
    alignItems: `center`,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.dark,
  },
}))
export default function LanguageDialog ({ state }) {
  const classes = useStyles()
  const icon = <FontAwesomeIcon icon={[`fas`, `language`]} />
  return (
    <Fragment>
      <IconButton
        aria-label={labels[state.languageCode]} id="open-language-dialog"
        aria-controls="language-dialog"         aria-haspopup="true"
        onClick={state.open}                    color="inherit"
      >
        {icon}
      </IconButton>
      <Dialog
        id="language-dialog"  aria-labelledby="language-dialog-title"
        onClose={state.close} open={state.isOpen}
      >
        <DialogTitle id="language-dialog-title" className={classes.dialogTitle} disableTypography>
          <Avatar id="language-dialog-avatar" className={classes.avatar}>{icon}</Avatar>
          <Typography component="h2" variant="h6">{titles[state.languageCode]}</Typography>
        </DialogTitle>
        <DialogContent>
          <nav>
            <List>
              {state.translations && links.map(({ languageCode, value }) => {
                const active = languageCode === state.languageCode
                return (
                  <ListItem
                    key={languageCode}
                    aria-label={active ? activeLinkLabels[languageCode] : undefined}
                    id={`language-link-${languageCode}`}
                  >
                    <ListItemText>
                      {active ? value : (
                        <Link onClick={state.close} to={state.translations[languageCode]}>
                          {value}
                        </Link>
                      )}
                    </ListItemText>
                  </ListItem>
                )
              })}
            </List>
          </nav>
        </DialogContent>
        <DialogActions>
          <Button id="close-language-dialog" onClick={state.close} color="primary">
            {closeText[state.languageCode]}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}