import { makeStyles } from "@material-ui/core/styles"
import { useAuth0 } from "lib/react/auth0"
import React from "react"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
const useStyles = makeStyles(theme => ({
  toolbar: {
    justifyContent: `center`,
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}), { name: `lib-home-call_to_action` })
export default function CallToAction (props) {
  const classes = useStyles()
  const auth0 = useAuth0()
  const loggedIn = Boolean(auth0.user)
  const { t } = props
  return (
    <Toolbar className={classes.toolbar}>
      {loggedIn ? null : (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={auth0.login}
        >
          {t({ en: () => `Log in`, es: () => `Ingresar` })}
        </Button>
      )}
      <Button
        className={classes.button}
        variant="contained"
        color={loggedIn ? `primary` : `secondary`}
        onClick={props.onContact}
      >
        {t({
          en: () => `Get in Touch`,
          es: () => `Contactarme`,
        })}
      </Button>
    </Toolbar>
  )
}