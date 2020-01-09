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
import TechnologiesSvg from "./TechnologiesSvg"
const useStyles = makeStyles(theme => ({
  section: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    "& > *": {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
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
    skills: <Fragment>I'm a Computer Programmer focused on Web Development</Fragment>,
    contact: {
      title: `Contact`,
      body: (
        <Fragment>
          A contact form is coming soon. <br />
          You can check <GithubProfile>my GitHub profile</GithubProfile> instead.
        </Fragment>
      ),
    },
  },
  es: {
    greeting: (
      <Fragment>Hola! mi nombre es Lucas <br /> Bienvenido a mi Página Web Personal</Fragment>
    ),
    call2action: `Pongámonos En Contacto`,
    skills: (
      <Fragment>Soy un Programador de Computadoras centrado en Desarrollo de Páginas Web</Fragment>
    ),
    contact: {
      title: `Contacto`,
      body: (
        <Fragment>
          Un formulario de contacto estará disponible muy pronto. <br />
          Por ahora podés visitar <GithubProfile>mi perfil en GitHub</GithubProfile>.
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
      <Container maxWidth="lg">
        <section className={classes.section}>
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
        </section>
        <section className={classes.section}>
          <Typography align="center" variant="h4" component="h1">
            {currentTranslation.skills}
          </Typography>
          <TechnologiesSvg isDark={isDark} />
        </section>
        <section className={classes.section}>
          <Typography ref={contactRef} align="center" variant="h4" component="h2">
            {currentTranslation.contact.title}
          </Typography>
          <Typography align="center" variant="h5" component="p">
            {currentTranslation.contact.body}
          </Typography>
        </section>
      </Container>
    )
  }
  return null
}