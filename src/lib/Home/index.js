import { makeStyles } from "@material-ui/core/styles"
import React, { useRef } from "react"
import Typography from "@material-ui/core/Typography"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import Card from "@material-ui/core/Card"
import WufooForm from "lib/react/WufooForm"
import Translation from "lib/Translation"
import { useDarkMode } from "lib/react/DarkMode"
import { useRoute } from "lib/react/routing/context"
import Container from "@material-ui/core/Container"
import SvgImage from "./SvgImage"
import svg from "./svg"
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
const useCallToActionStyles = makeStyles(() => ({
  toolbar: {
    justifyContent: `center`,
  },
}), { name: `lib-home-call_to_action` })
function CallToAction (props) {
  const classes = useCallToActionStyles()
  return (
    <Toolbar className={classes.toolbar}>
      <Button variant="contained" color="primary" onClick={props.onClick}>{props.children}</Button>
    </Toolbar>
  )
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
const useContactFormStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(4),
    backgroundColor: theme.palette.type === `dark` ? `#ededed` : `#fdfdfd`,
  },
}), { name: `lib-home-contact_form` })
function ContactForm ({ innerRef, ...other }) {
  return (
    <Card classes={useContactFormStyles()} raised={true} ref={innerRef}>
      <WufooForm {...other} />
    </Card>
  )
}
const translation = new Translation({
  en: {
    Welcome (props) {
      return (
        <Section>
          <Heading>Hi! My name is Lucas <br /> Welcome to my Personal Website</Heading>
          <CallToAction onClick={props.handleAction}>Get in Touch</CallToAction>
          {props.image}
        </Section>
      )
    },
    Skills (props) {
      return (
        <Section>
          <Heading>Skill Set</Heading>
          <Body>
            I'm a Computer Programmer focused on Web Development. I can be part of teams working
            with technologies like JavaScript, React, NodeJS, etc.
          </Body>
          {props.image}
        </Section>
      )
    },
    Experience (props) {
      return (
        <Section>
          <Heading>Experience</Heading>
          <Body>
            I've made this website to showcase my abilities as a programmer. Take a look around or
            check the <GitHubProject>source code on GitHub</GitHubProject>.
          </Body>
          {props.image}
        </Section>
      )
    },
    Contact (props) {
      return <ContactForm hash="zdhts7212isvs6" height="435" {...props} />
    },
  },
  es: {
    Welcome (props) {
      return (
        <Section>
          <Heading>Hola! mi nombre es Lucas <br /> Bienvenido a mi Página Web Personal</Heading>
          <CallToAction onClick={props.handleAction}>Pongámonos en Contacto</CallToAction>
          {props.image}
        </Section>
      )
    },
    Skills (props) {
      return (
        <Section>
          <Heading>Capacitación Profesional</Heading>
          <Body>
            Soy un Programador de Computadoras centrado en el Desarrollo de Páginas Web. Puedo ser
            parte de equipos trabajando con tecnologías como JavaScript, React, NodeJS, etc.
          </Body>
          {props.image}
        </Section>
      )
    },
    Experience (props) {
      return (
        <Section>
          <Heading>Experiencia</Heading>
          <Body>
            Hice este sitio web para mostrar mis habilidades como programador. Podés explorarlo
            o ver el <GitHubProject>código fuente en GitHub</GitHubProject>.
          </Body>
          {props.image}
        </Section>
      )
    },
    Contact (props) {
      return <ContactForm hash="q5wuhcb17c2yrt" height="435" {...props} />
    },
  },
})
function View () {
  const isDark = useDarkMode().value
  const contactRef = useRef(null)
  const { Welcome, Skills, Experience, Contact } = translation.get()
  return (
    <Container maxWidth="md">
      <Welcome
        handleAction={() => contactRef.current.scrollIntoView()}
        image={<SvgImage isDark={isDark} source={svg.onlineProfile} />}
      />
      <Skills image={<SvgImage isDark={isDark} source={svg.technologies} />} />
      <Experience image={<SvgImage isDark={isDark} source={svg.website} />} />
      <Contact innerRef={contactRef} />
    </Container>
  )
}
export default function Home () {
  return useRoute().render.home ? <View /> : null
}