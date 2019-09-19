import React, { Fragment } from "react"
import { makeStyles } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import makeTranslations from "local/makeTranslations"
import { Link } from "local/core/links"
import supportedLanguages, { languageCodePropType } from "local/supportedLanguages"
import PropTypes from "prop-types"
import { clientPropTypes } from "local/core/createBaseClient"
import routingPropType from "local/core/propTypes/routingPropType"
const subtitles = makeTranslations({
  en: `Not Found`,
  es: `No Encontrado`,
})
const icon = <FontAwesomeIcon icon={[`far`, `dizzy`]} />
const icons = makeTranslations(() => icon)
const messages = {
  default: supportedLanguages.reduce((messages, languageCode) => {
    messages[languageCode] = messages[languageCode].map((text, i) => ({
      key: `${languageCode}${i}`,
      text,
    }))
    return messages
  }, makeTranslations({
    en: [
      `Broken links redirect to this page.`,
      `There is nothing to show you right now.`,
    ],
    es: [
      `Los links inservibles redirigen a esta página.`,
      `Por ahora no hay nada para mostrar.`,
    ],
  })),
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
const NotFoundView = (useStyles => function NotFoundView (props) {
  const classes = useStyles()
  const {
    hidden,
    languageCode,
    routing,
    referrer,
    BaseClient,
    clientProps,
  } = props
  if (hidden) {
    return null
  }
  return (
    <BaseClient {...clientProps} subtitles={subtitles} icons={icons}>
      <div className={classes.root}>
        {typeof referrer === `string` ? (
          <Fragment>
            <Typography id="error-message" variant="body1" color="textPrimary">
              {messages.error[languageCode]}
            </Typography>
            <Typography
              id="referrer"
              variant="body2"
              color="textSecondary"
              className={classes.referrer}
            >
              {referrer}
            </Typography>
            <div className={classes.link}>
              <Link id="close-not-found" to={routing.locations.notFound[languageCode]}>
                {links.close[languageCode]}
              </Link>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div id="default-message">
              {messages.default[languageCode].map(({ key, text }) => (
                <Typography key={key} variant="body1" color="textPrimary">{text}</Typography>
              ))}
            </div>
            <div className={classes.link}>
              <Link id="go-to-home" to={routing.locations.home[languageCode]}>
                {links.home[languageCode]}
              </Link>
            </div>
          </Fragment>
        )}
      </div>
    </BaseClient>
  )
})(makeStyles(theme => ({
  root: {
    maxWidth: 600,
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
}), { name: `NotFoundView` }))
export default NotFoundView
NotFoundView.propTypes = {
  hidden: PropTypes.bool.isRequired,
  languageCode: languageCodePropType.isRequired,
  routing: routingPropType.isRequired,
  referrer: PropTypes.string,
  BaseClient: PropTypes.elementType.isRequired,
  clientProps: PropTypes.shape(clientPropTypes).isRequired,
}