import { makeStyles } from "@material-ui/core/styles"
import { useAuth0 } from "lib/react/auth0"
import useTranslation from "lib/react/useTranslation"
import React from "react"
import Button from "@material-ui/core/Button"
import ProfileLinks from "./ProfileLinks"
import Layout from "./Layout"
import DefaultAvatarSvg from "./DefaultAvatarSvg"
import Link from "lib/react/links/Link"
import PropTypes from "prop-types"
const useStyles = makeStyles(theme => ({
  logoutButton: {
    fontSize: theme.spacing(1.5),
    lineHeight: 1.5,
    backgroundColor: (
      theme.palette.type === `dark` ? `rgba(255, 255, 255, 0.12)` :
      `rgba(0, 0, 0, 0.1)`
    ),
    "&:hover": {
      backgroundColor: (
        theme.palette.type === `dark` ? `rgba(255, 255, 255, 0.16)` :
        `rgba(0, 0, 0, 0.14)`
      ),
    },
  },
  createProfile: {
    display: `inline-block`,
    border: `${theme.spacing(0.25)}px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(0.5),
    padding: `0 ${theme.spacing(1.5)}px`,
  },
}), { name: `lib-react-account_applet` })
export default function AccountApplet (props) {
  const classes = useStyles()
  const auth0 = useAuth0()
  const t = useTranslation()
  const { user } = auth0
  const { closeDashboard } = props
  if (user) {
    const logoutButton = (
      <Button
        className={classes.logoutButton}
        size="small"
        variant="text"
        color="default"
        onClick={auth0.logout}
      >
        {t({ en: () => `Log out`, es: () => `Salir` })}
      </Button>
    )
    const { profile_id } = user
    if (profile_id) {
      return (
        <ProfileLinks
          t={t}
          closeDashboard={closeDashboard}
          logoutButton={logoutButton}
          profileId={profile_id}
        />
      )
    } else {
      return (
        <Layout
          avatar={<DefaultAvatarSvg />}
          topText={
            <Link to="#" className={classes.createProfile} onClick={closeDashboard}>
              {t({ en: () => `Create profile`, es: () => `Crear perfil` })}
            </Link>
          }
          bottomText={logoutButton}
        />
      )
    }
  }
  return (
    <Layout
      avatar={<DefaultAvatarSvg />}
      text={
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            auth0.login()
            closeDashboard()
          }}
        >
          {t({ en: () => `Log in`, es: () => `Ingresar` })}
        </Button>
      }
    />
  )
}
AccountApplet.propTypes = {
  closeDashboard: PropTypes.func,
}