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
import WebsiteSvg from "./WebsiteSvg"
const useStyles = makeStyles(theme => ({
  body: {
    maxWidth: `55rem`,
    marginLeft: `auto`,
    marginRight: `auto`,
  },
  section: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    "& > *": {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  },
  toolbar: {
    justifyContent: `center`,
  },
}))
function GitHubProfile (props) {
  return <Link target="__blank" href="https://github.com/lucasMontenegro">{props.children}</Link>
}
function GitHubProject (props) {
  return (
    <Link target="__blank" href="https://github.com/lucasMontenegro/lucas-montenegro">
      {props.children}
    </Link>
  )
}
const translation = new Translation({
  en: {
    welcome: {
      title: <Fragment>Hi! My name is Lucas <br /> Welcome to my Personal Website</Fragment>,
      button: `Get in Touch`,
    },
    skills: {
      title: `Professional Skills`,
      body: (
        <Fragment>
          I'm a Computer Programmer focused on Web Development. I can be part of teams working
          with technologies like JavaScript, React, NodeJS, etc.
        </Fragment>
      ),
    },
    experience: {
      title: `Experience`,
      body: (
        <Fragment>
          I've made this website to showcase my abilities as a programmer. Take a look around or
          check the <GitHubProject>source code on GitHub</GitHubProject>.
        </Fragment>
      ),
    },
    contact: {
      title: `Contact`,
      body: (
        <Fragment>
          A contact form is coming soon. You can check <GitHubProfile>my GitHub
          profile</GitHubProfile> instead.
        </Fragment>
      ),
    },
  },
  es: {
    welcome: {
      title: (
        <Fragment>Hola! mi nombre es Lucas <br /> Bienvenido a mi Página Web Personal</Fragment>
      ),
      button: `Pongámonos en Contacto`,
    },
    skills: {
      title: `Capacitación Profesional`,
      body: (
        <Fragment>
          Soy un Programador de Computadoras centrado en el Desarrollo de Páginas Web. Puedo ser
          parte de equipos trabajando con tecnologías como JavaScript, React, NodeJS, etc.
        </Fragment>
      ),
    },
    experience: {
      title: `Experiencia`,
      body: (
        <Fragment>
          Hice este sitio web para mostrar mis habilidades como programador. Podés explorarlo
          o ver el <GitHubProject>código fuente en GitHub</GitHubProject>.
        </Fragment>
      ),
    },
    contact: {
      title: `Contacto`,
      body: (
        <Fragment>
          Un formulario de contacto estará disponible muy pronto. Por ahora podés
          visitar <GitHubProfile>mi perfil en GitHub</GitHubProfile>.
        </Fragment>
      ),
    },
  },
})
function Heading (props) {
  return (
    <Typography align="center" variant="h4" component="h1">
      {props.children}
    </Typography>
  )
}
function Body (props) {
  return (
    <Typography variant="h5" component="p" className={props.classes.body}>
      {props.children}
    </Typography>
  )
}
export default function Home () {
  const classes = useStyles()
  const isDark = useDarkMode().value
  const contactRef = useRef(null)
  if (useRoute().render.home) {
    const currentTranslation = translation.get()
    return (
      <Container maxWidth="lg">
        <section className={classes.section}>
          <Heading>{currentTranslation.welcome.title}</Heading>
          <Toolbar className={classes.toolbar}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => contactRef.current.scrollIntoView()}
            >
              {currentTranslation.welcome.button}
            </Button>
          </Toolbar>
          <OnlineProfileSvg isDark={isDark} />
        </section>
        <section className={classes.section}>
          <Heading>{currentTranslation.skills.title}</Heading>
          <Body classes={classes}>{currentTranslation.skills.body}</Body>
          <TechnologiesSvg isDark={isDark} />
        </section>
        <section className={classes.section}>
          <Heading>{currentTranslation.experience.title}</Heading>
          <Body classes={classes}>{currentTranslation.experience.body}</Body>
          <WebsiteSvg isDark={isDark} />
        </section>
        <section className={classes.section}>
          <Typography ref={contactRef} align="center" variant="h4" component="h2">
            {currentTranslation.contact.title}
          </Typography>
          <Body classes={classes}>{currentTranslation.contact.body}</Body>
        </section>
      </Container>
    )
  }
  return null
}