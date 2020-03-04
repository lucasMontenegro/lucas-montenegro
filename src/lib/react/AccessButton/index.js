import { makeStyles } from "@material-ui/core/styles"
import useAccessButtonState from "./useAccessButtonState"
import useTranslation from "lib/react/useTranslation"
import useResponsiveLayout from "lib/react/useResponsiveLayout"
import React, { Fragment } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Typography from "@material-ui/core/Typography"
import Checkbox from "@material-ui/core/Checkbox"
import PropTypes from "prop-types"
const useStyles = makeStyles(theme => ({
  autoLogout: {
    paddingLeft: theme.spacing(2),
  },
  flexibleSpace: {
    flexGrow: 1,
  },
}), { name: `lib-react-access_button` })
const dialogId = `lib-react-access_button-logout_dialog`
const dialogTextId = `lib-react-access_button-logout_dialog_text`
export default function AccessButton (props) {
  const classes = useStyles()
  const state = useAccessButtonState(props.closeDashboard)
  const t = useTranslation()
  const r = useResponsiveLayout()
  return (
    <Fragment>
      {state.loggedIn ? (
        <Button
          color="default"
          variant="text"
          onClick={state.logout.open}
          aria-controls={dialogId}
        >
          {t({ en: () => `Log out`, es: () => `Salir` })}
        </Button>
      ) : (
        <Button color="primary" variant="contained" onClick={state.login}>
          {t({ en: () => `Log in`, es: () => `Ingresar` })}
        </Button>
      )}
      <Dialog
        maxWidth="sm"
        scroll="body"
        fullScreen={r({
          desktop: () => false,
          tablet: () => false,
          mobile: () => true,
        })}
        id={dialogId}
        aria-describedby={dialogTextId}
        open={state.logout.isOpen}
        onClose={state.logout.close}
      >
        <DialogContent>
          <DialogContentText color="textPrimary" variant="body1" id={dialogTextId}>
            {t({
              en: () => `Logging out may cause data loss.`,
              es: () => `Cerrar sesión puede causar perdida de datos.`,
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <FormControlLabel
            className={classes.autoLogout}
            label={
              <Typography variant="body2" color="textSecondary" component="span">
                {t({
                  en: () => `Don't show me this again`,
                  es: () => `No volver a mostrarme esto`,
                })}
              </Typography>
            }
            control={
              <Checkbox
                color="primary"
                checked={state.logout.auto}
                onChange={state.logout.handleAuto}
              />
            }
          />
          <div className={classes.flexibleSpace} />
          <Button
            color="default"
            variant="text"
            onClick={state.logout.close}
            aria-controls={dialogId}
          >
            {t({ en: () => `Cancel`, es: () => `Cancelar` })}
          </Button>
          <Button autoFocus color="default" variant="text" onClick={state.logout.confirm}>
            {t({ en: () => `Ok`, es: () => `Aceptar` })}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
AccessButton.propTypes = {
  closeDashboard: PropTypes.func,
}