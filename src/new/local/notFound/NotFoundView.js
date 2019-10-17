import React, { Fragment } from "react"
import Typography from "@material-ui/core/Typography"
import { Link } from "new/local/paperbase/links"
import useStyles from "new/local/notFound/useStyles"
import translations from "new/local/notFound/translations"
import propTypes from "new/local/notFound/propTypes"
function NotFoundView (props) {
  const classes = useStyles()
  const {
    match,
    languageCode,
    referrer,
    routing,
    BaseClient,
    clientProps,
  } = props
  if (!referrer && !match) {
    return null
  }
  return (
    <BaseClient
      {...clientProps}
      subtitles={translations.subtitles}
      icons={translations.icons}
    >
      <div className={classes.root}>
        {referrer ? (
          <Fragment>
            <Typography id="error-message" variant="body1" color="textPrimary">
              {translations.messages.error[languageCode]}
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
                {translations.links.close[languageCode]}
              </Link>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div id="default-message">
              {translations.messages.default[languageCode].map(({ key, text }) => (
                <Typography key={key} variant="body1" color="textPrimary">{text}</Typography>
              ))}
            </div>
            <div className={classes.link}>
              <Link id="go-to-home" to={routing.locations.home[languageCode]}>
                {translations.links.home[languageCode]}
              </Link>
            </div>
          </Fragment>
        )}
      </div>
    </BaseClient>
  )
}
NotFoundView.propTypes = propTypes
export default NotFoundView