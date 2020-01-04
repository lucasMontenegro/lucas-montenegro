import { makeStyles } from "@material-ui/core/styles"
import React, { Fragment, useRef } from "react"
import Link from "@material-ui/core/Link"
import Translation from "lib/Translation"
import { useDarkMode } from "lib/react/DarkMode"
import { useRoute } from "lib/react/routing/context"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import OnlineProfileSvg from "./OnlineProfileSvg"
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    "& > *": {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
    },
  },
  toolbar: {
    justifyContent: `center`,
  },
}))
function GithubProfile (props) {
  return <Link target="__blank" href="https://github.com/lucasMontenegro">{props.children}</Link>
}
const translation = new Translation({
  en: {
    greeting: <Fragment>Hi! My Name Is Lucas <br /> Welcome To My Personal Website</Fragment>,
    call2action: `Get In Touch`,
    contact: {
      title: `Contact`,
      body: (
        <Fragment>
          A contact form is coming soon. <br />
          You can check my <GithubProfile>GitHub profile</GithubProfile> instead.
        </Fragment>
      ),
    },
  },
  es: {
    greeting: (
      <Fragment>Hola! Mi nombre es Lucas <br /> Bienvenido A Mi Página Web Personal</Fragment>
    ),
    call2action: `Pongámonos En Contacto`,
    contact: {
      title: `Contacto`,
      body: (
        <Fragment>
          Un formulario de contacto estará disponible muy pronto. <br />
          Por ahora podés visitar mi <GithubProfile>perfil en GitHub</GithubProfile>.
        </Fragment>
      ),
    },
  },
})
export default function Home () {
  const classes = useStyles()
  const isDark = useDarkMode().value
  const contactRef = useRef(null)
  if (useRoute().render.home) {
    const currentTranslation = translation.get()
    return (
      <Container maxWidth="lg" className={classes.root}>
        <Typography align="center" variant="h4" component="h1">
          {currentTranslation.greeting}
        </Typography>
        <Toolbar className={classes.toolbar}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => contactRef.current.scrollIntoView()}
          >
            {currentTranslation.call2action}
          </Button>
        </Toolbar>
        <OnlineProfileSvg isDark={isDark} />
        <Typography ref={contactRef} align="center" variant="h4" component="h2">
          {currentTranslation.contact.title}
        </Typography>
        <Typography align="center" variant="h5" component="p">
          {currentTranslation.contact.body}
        </Typography>
      </Container>
    )
  }
  return null
}