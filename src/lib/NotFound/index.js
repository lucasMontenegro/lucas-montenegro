import { makeStyles } from "@material-ui/core/styles"
import Translation from "lib/Translation"
import { useRoutingContext } from "lib/react/routing/context"
import React, { Fragment } from "react"
import Typography from "@material-ui/core/Typography"
import Link from "lib/react/links/Link"
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: `100vh`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
  },
  content: {
    maxWidth: theme.spacing(75),
    margin: theme.spacing(4),
  },
  referrer: {
    margin: theme.spacing(2),
    padding: `8px 16px`,
    borderLeft: `2px solid ${theme.palette.text.secondary}`,
  },
  link: {
    margin: theme.spacing(2),
    textAlign: `right`,
  },
}), { name: `lib-not_found` })
const translation = new Translation({
  en: {
    title: `Not Found`,
    error: `Couldn't find the page you where looking for:`,
    greeting: `Broken links redirect to this page`,
    close: `Close`,
    home: `Go to Home`,
  },
  es: {
    title: `No Encontrado`,
    error: `No se pudo encontrar la página solicitada:`,
    greeting: `Los links inservibles redirigen a esta página`,
    close: `Cerrar`,
    home: `Ir a Inicio`,
  },
})
export default function NotFound () {
  const classes = useStyles()
  const { route, routing } = useRoutingContext()
  if (route.render.notFound) {
    const currentTranslation = translation.get()
    const referrer = route.location.state
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          {(referrer && typeof referrer === `object`) ? (
            <Fragment>
              <Typography variant="body1" color="textPrimary">
                {currentTranslation.error}
              </Typography>
              <Typography variant="body2" color="textSecondary" className={classes.referrer}>
                {`${referrer.pathname}${referrer.search}${referrer.hash}`}
              </Typography>
              <div className={classes.link}>
                <Link to={routing.translatedLocations.notFound.get()}>
                  {currentTranslation.close}
                </Link>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <Typography variant="body1" color="textPrimary">
                {currentTranslation.greeting}
              </Typography>
              <div className={classes.link}>
                <Link id="go-to-home" to={routing.translatedLocations.home.get()}>
                  {currentTranslation.home}
                </Link>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    )
  }
  return null
}