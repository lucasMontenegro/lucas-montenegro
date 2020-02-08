import { makeStyles } from "@material-ui/core/styles"
import useTranslation from "lib/react/useTranslation"
import useResponsiveLayout from "lib/react/useResponsiveLayout"
import { useDarkMode } from "lib/react/DarkMode"
import React, { useState, Fragment } from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import Avatar from "@material-ui/core/Avatar"
import { FontAwesomeIcon } from "lib/react/fontAwesome"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import DialogContent from "@material-ui/core/DialogContent"
import Switch from "@material-ui/core/Switch"
import { useRoutingContext } from "lib/react/routing/context"
import Link from "lib/react/links/Link"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
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
  section: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  darkMode: {
    display: `flex`,
    justifyContent: `flex-end`,
  },
}), { name: `lib-react-settings` })
export default function Settings (props) {
  const classes = useStyles()
  const t = useTranslation()
  const r = useResponsiveLayout()
  const darkMode = useDarkMode()
  const [isOpen, setOpenTo] = useState(false)
  const close = () => setOpenTo(false)
  return (
    <Fragment>
      <Dialog
        maxWidth="xs"
        scroll="body"
        fullScreen={r({
          desktop: () => false,
          tablet: () => false,
          mobile: () => true,
        })}
        id="lib-react-settings"
        open={isOpen}
        onClose={close}
      >
        <DialogTitle className={classes.title} disableTypography>
          <Avatar className={classes.avatar}><FontAwesomeIcon icon={[`fas`, `cog`]} /></Avatar>
          <Typography component="h1" variant="h5">
            {t({ en: () => `Settings`, es: () => `Configuración` })}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <section className={classes.section}>
            <Typography variant="h6" component="h2" id="lib-react-settings-dark_mode_label">
              {t({ en: () => `Dark mode`, es: () => `Modo oscuro` })}
            </Typography>
            <Typography variant="body2" component="p">
              {t({
                en: () => (
                  <Fragment>
                    This option turns the light surfaces of the page dark, creating an experience
                    ideal for night.
                  </Fragment>
                ),
                es: () => (
                  <Fragment>
                    Esta opción cambia las superfícies claras de la página por oscuras, creando
                    una experiencia ideal para la noche.
                  </Fragment>
                ),
              })}
            </Typography>
            <div className={classes.darkMode}>
              <Switch
                color="primary"
                aria-labelledby="lib-react-settings-dark_mode_label"
                checked={darkMode.value}
                onChange={darkMode.toggle}
              />
            </div>
          </section>
          <Divider />
          <section className={classes.section}>
            <Typography variant="h6" component="h2">
              {t({ en: () => `Translations`, es: () => `Traducciones` })}
            </Typography>
            <Typography variant="body2" component="p">
              {t({
                en: () => (
                  <Fragment>
                    English and Spanish translations are available. Click on the link below to
                    switch to Spanish.
                  </Fragment>
                ),
                es: () => (
                  <Fragment>
                    Hay traducciones disponibles al español y al inglés. Hacé click en el link de
                    abajo para cambiar a inglés.
                  </Fragment>
                ),
              })}
            </Typography>
            <ul>
              {useRoutingContext().getTranslationLinks().map(link => (
                <li key={link.languageCode}><Link to={link.location}>{link.text}</Link></li>
              ))}
            </ul>
          </section>
          <Divider />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} aria-controls="lib-react-settings">
            {t({ en: () => `Done`, es: () => `Listo` })}
          </Button>
        </DialogActions>
      </Dialog>
      {props.children(() => setOpenTo(true))}
    </Fragment>
  )
}