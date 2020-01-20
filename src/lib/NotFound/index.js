import { makeStyles } from "@material-ui/core/styles"
import useTranslation from "lib/react/useTranslation"
import React, { Fragment } from "react"
import Typography from "@material-ui/core/Typography"
import Link from "lib/react/links/Link"
import { useRoutingContext } from "lib/react/routing/context"
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
function View (props) {
  const classes = useStyles()
  const t = useTranslation()
  const referrer = props.route.location.state
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {(referrer && typeof referrer === `object`) ? (
          <Fragment>
            <Typography variant="body1" color="textPrimary">
              {t({
                en: () => `Couldn't find the page you where looking for:`,
                es: () => `No se pudo encontrar la página solicitada:`,
              })}
            </Typography>
            <Typography variant="body2" color="textSecondary" className={classes.referrer}>
              {`${referrer.pathname}${referrer.search}${referrer.hash}`}
            </Typography>
            <div className={classes.link}>
              <Link to={props.routing.translatedLocations.notFound.get()}>
                {t({ en: () => `Close`, es: () => `Cerrar` })}
              </Link>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <Typography variant="body1" color="textPrimary">
              {t({
                en: () => `Broken links redirect to this page`,
                es: () => `Los links inservibles redirigen a esta página`,
              })}
            </Typography>
            <div className={classes.link}>
              <Link id="go-to-home" to={props.routing.translatedLocations.home.get()}>
                {t({ en: () => `Go to Home`, es: () => `Ir a Inicio` })}
              </Link>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  )
}
export default function NotFound () {
  const { route, routing } = useRoutingContext()
  return route.render.notFound ? <View route={route} routing={routing} /> : null
}