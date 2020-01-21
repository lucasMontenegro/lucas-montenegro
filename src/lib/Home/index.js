import { makeStyles } from "@material-ui/core/styles"
import React, { useRef, Fragment } from "react"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import useTranslation from "lib/react/useTranslation"
import { useDarkMode } from "lib/react/DarkMode"
import Container from "@material-ui/core/Container"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import SvgImage from "./SvgImage"
import svg from "./svg"
import Card from "@material-ui/core/Card"
import WufooForm from "lib/react/WufooForm"
import { useRoute } from "lib/react/routing/context"
const useSectionStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    "& > *": {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  },
}), { name: `lib-home-section` })
function Section (props) {
  const classes = useSectionStyles()
  return <section {...props} className={classes.root} />
}
function Heading (props) {
  return <Typography align="center" variant="h4" component="h1">{props.children}</Typography>
}
function Body (props) {
  return <Typography variant="h5" component="p">{props.children}</Typography>
}
function GitHubProject (props) {
  return (
    <Link target="__blank" href="https://github.com/lucasMontenegro/lucas-montenegro">
      {props.children}
    </Link>
  )
}
const useStyles = makeStyles(theme => ({
  toolbar: {
    justifyContent: `center`,
  },
  contact: {
    padding: theme.spacing(2),
  },
  contactCard: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.type === `dark` ? `#ededed` : `#fdfdfd`,
  },
}), { name: `lib-home` })
function View () {
  const classes = useStyles()
  const t = useTranslation()
  const isDark = useDarkMode().value
  const contactRef = useRef(null)
  return (
    <Container maxWidth="md">
      <Section>
        <Heading>
          {t({
            en: () => (
              <Fragment>Hi! My name is Lucas <br /> Welcome to my Personal Website</Fragment>
            ),
            es: () => (
              <Fragment>
                Hola! mi nombre es Lucas <br /> Bienvenido a mi Página Web Personal
              </Fragment>
            ),
          })}
        </Heading>
        <Toolbar className={classes.toolbar}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => contactRef.current.scrollIntoView()}
          >
            {t({
              en: () => `Get in Touch`,
              es: () => `Pongámonos en Contacto`,
            })}
          </Button>
        </Toolbar>
        <SvgImage isDark={isDark} source={svg.onlineProfile} />
      </Section>
      <Section>
        <Heading>
          {t({
            en: () => `Skill Set`,
            es: () => `Capacitación Profesional`,
          })}
        </Heading>
        <Body>
          {t({
            en: () => (
              <Fragment>
                I'm a Computer Programmer focused on Web Development. I can be part of teams
                working with technologies like JavaScript, React, NodeJS, etc.
              </Fragment>
            ),
            es: () => (
              <Fragment>
                Soy un Programador de Computadoras centrado en el Desarrollo de Páginas Web. Puedo
                ser parte de equipos trabajando con tecnologías como JavaScript, React, NodeJS,
                etc.
              </Fragment>
            ),
          })}
        </Body>
        <SvgImage isDark={isDark} source={svg.technologies} />
      </Section>
      <Section>
        <Heading>
          {t({
            en: () => `Experience`,
            es: () => `Experiencia`,
          })}
        </Heading>
        <Body>
          {t({
            en: () => (
              <Fragment>
                I've made this website to showcase my abilities as a programmer. Take a look
                around or check the <GitHubProject>source code on GitHub</GitHubProject>.
              </Fragment>
            ),
            es: () => (
              <Fragment>
                Hice este sitio web para mostrar mis habilidades como programador. Podés explorarlo
                o ver el <GitHubProject>código fuente en GitHub</GitHubProject>.
              </Fragment>
            ),
          })}
        </Body>
        <SvgImage isDark={isDark} source={svg.website} />
      </Section>
      <section className={classes.contact} ref={contactRef}>
        <Card className={classes.contactCard} raised={true}>
          <WufooForm
            hash={t({
              en: () => `zdhts7212isvs6`,
              es: () => `q5wuhcb17c2yrt`,
            })}
            height="435"
          />
        </Card>
      </section>
    </Container>
  )
}
export default function Home () {
  return useRoute().render.home ? <View /> : null
}