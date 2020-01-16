import Translation from "lib/Translation"
import { makeStyles } from "@material-ui/core/styles"
import React, { useState, Fragment } from "react"

import DialogTitle from "@material-ui/core/DialogTitle"
import Avatar from "@material-ui/core/Avatar"
import TranslateIcon from "@material-ui/icons/Translate"
import Typography from "@material-ui/core/Typography"

import DialogContent from "@material-ui/core/DialogContent"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Link from "lib/links/ReactRouterLink"

import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"

import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"

import Dialog from "@material-ui/core/Dialog"
import useSmoothClosing from "lib/TranslationDialog/useSmoothClosing"
import PropTypes from "prop-types"
const translation = new Translation({
  en: {
    currentLanguage: `Current language`,
    open: `Translation Dialog`,
    title: `Select Language`,
    close: `CLOSE`,
  },
  es: {
    currentLanguage: `Idioma actual`,
    open: `Diálogo de Idiomas`,
    title: `Seleccione un Idioma`,
    close: `CERRAR`,
  },
})
const ids = {
  dialog: `lib-tranlation_dialog`,
  title: `lib-tranlation_dialog-title`,
}
const useStyles = makeStyles(theme => ({
  title: {
    display: `flex`,
    alignItems: `center`,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}), { name: ids.dialog })
export default function TranslationDialog ({ getLinks }) {
  const currentTranslation = translation.get()
  const classes = useStyles()
  const [isOpen, saveIsOpen] = useState(false)
  const close = () => saveIsOpen(false)
  const children = (
    <Fragment>
      <DialogTitle id={ids.title} className={classes.title} disableTypography>
        <Avatar className={classes.avatar}><TranslateIcon /></Avatar>
        <Typography component="h2" variant="h6">{currentTranslation.title}</Typography>
      </DialogTitle>
      <DialogContent>
        <nav>
          <List>
            {isOpen && getLinks().map(({ location, otherProps }) => (
              <ListItem key={otherProps.key}>
                {location ? (
                  <ListItemText>
                    <Link id={otherProps.id} onClick={close} to={location}>
                      {otherProps.text}
                    </Link>
                  </ListItemText>
                ) : (
                  <ListItemText aria-label={currentTranslation.currentLanguage}>
                    {otherProps.text}
                  </ListItemText>
                )}
              </ListItem>
            ))}
          </List>
        </nav>
      </DialogContent>
      <DialogActions>
        <Button color="primary" aria-controls={ids.dialog} onClick={close}>
          {currentTranslation.close}
        </Button>
      </DialogActions>
    </Fragment>
  )
  return (
    <Fragment>
      <Tooltip title={currentTranslation.open}>
        <IconButton
          aria-controls={ids.dialog}
          aria-haspopup="true"
          onClick={() => saveIsOpen(true)}
        >
          <TranslateIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        id={ids.dialog}
        aria-labelledby={ids.title}
        onClose={close}
        open={isOpen}
        scroll="body"
      >
        {useSmoothClosing(isOpen, children)}
      </Dialog>
    </Fragment>
  )
}
TranslationDialog.propTypes = {
  getLinks: PropTypes.func.isRequired,
}