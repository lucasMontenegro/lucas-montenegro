import React, { useRef } from "react"
import { makeStyles } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import makeTranslations from "local/makeTranslations"
import { Link } from "local/core/links"
const subtitles = makeTranslations({
  en: `Not Found`,
  es: `No Encontrado`,
})
const icon = <FontAwesomeIcon icon={[`far`, `dizzy`]} />
const icons = makeTranslations(() => icon)
const messages = {
  default: makeTranslations({
    en: `Broken links redirect to this page. There is nothing to show you right now.`,
    es: `Los links inservibles redirigen a esta página. Por ahora no hay nada para mostrar.`,
  }),
  error: makeTranslations({
    en: `Couldn't find the page you where looking for:`,
    es: `No se pudo encontrar la página solicitada:`,
  }),
}
const links = {
  close: makeTranslations({
    en: `Close`,
    es: `Cerrar`,
  }),
  home: makeTranslations({
    en: `Home`,
    es: `Inicio`,
  }),
}
const useStyles = makeStyles(theme => ({
  root: {
    padding: 16,
    minHeight: `calc(100vh - 48px)`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  message: {
    flexBasis: 600,
  },
  referrer: {
    margin: 16,
    padding: `8px 16px`,
    borderLeft: `2px solid ${theme.palette.text.secondary}`,
  },
  link: {
    margin: 16,
    textAlign: `right`,
  },
}))
export default function spyOnCreateNotFound ({ createBaseClient }) {
  return function createNotFound (options) {
    const {
      appName,
      initialLocation,
      linkTranslators,
      routing,
    } = options
    const BaseClient = createBaseClient({
      clientName: `notFound`,
      appName,
      initialLocation,
      linkTranslators,
    })
    return function NotFound (props) {
      const classes = useStyles()
      const savedLocation = useRef(null)
      const referrer = useRef(``)
      const {
        languageCode,
        match,
        location,
      } = props
      if (match && location !== savedLocation.current) {
        savedLocation.current = location
        if (location.state instanceof Object && location.state.referrer instanceof Object) {
          const obj = location.state.referrer
          referrer.current = `${obj.pathname}${obj.search}${obj.hash}`
        } else {
          referrer.current = ``
        }
      }
      if (!match && !referrer.current) {
        return null
      }
      return (
        <BaseClient {...props} subtitles={subtitles} icons={icons}>
          <div className={classes.root}>
            {referrer.current ? (
              <div className={classes.message}>
                <Typography id="error-message" variant="body1" color="textPrimary">
                  {messages.error[languageCode]}
                </Typography>
                <Typography
                  id="referrer"
                  variant="body2"
                  color="textSecondary"
                  className={classes.referrer}
                >
                  {referrer.current}
                </Typography>
                <div className={classes.link}>
                  <Link id="close-not-found" to={routing.locations.notFound[languageCode]}>
                    {links.close[languageCode]}
                  </Link>
                </div>
              </div>
            ) : (
              <div className={classes.message}>
                <Typography id="default-message" variant="body1" color="textPrimary">
                  {messages.default[languageCode]}
                </Typography>
                <div className={classes.link}>
                  <Link id="go-to-home" to={routing.locations.home[languageCode]}>
                    {links.home[languageCode]}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </BaseClient>
      )
    }
  }
}