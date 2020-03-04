import { makeStyles } from "@material-ui/core/styles"
import React, { Fragment } from "react"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import useTranslation from "lib/react/useTranslation"
import { useDarkMode } from "lib/react/DarkMode"
import useContact from "./useContact"
import MainBar from "lib/react/MainBar"
import Container from "@material-ui/core/Container"
import DocumentTitle from "lib/react/DocumentTitle"
import CallToAction from "./CallToAction"
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
  return <section {...props} className={useSectionStyles().root} />
}
const useSectionBodyStyles = makeStyles(theme => ({
  root: {
    maxWidth: `50rem`,
    marginLeft: `auto`,
    marginRight: `auto`,
  },
}), { name: `lib-home-section_body` })
function SectionBody (props) {
  return (
    <Typography classes={useSectionBodyStyles()} variant="h5" component="p">
      {props.children}
    </Typography>
  )
}
function GitHubProject (props) {
  return (
    <Link target="__blank" href="https://github.com/lucasMontenegro/lucas-montenegro">
      {props.children}
    </Link>
  )
}
const useStyles = makeStyles(theme => ({
  myNameIs: {
    fontSize: `75%`,
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
  const contactState = useContact()
  return (
    <MainBar>
      <Container maxWidth="md">
        <DocumentTitle
          value={t({
            en: () => `Home - Lucas Montenegro`,
            es: () => `Inicio - Lucas Montenegro`,
          })}
        />
        <Section>
          <Typography align="center" variant="h4" component="h1">
            <span className={classes.myNameIs}>
              {t({
                en: () => `Hi! my name is Lucas`,
                es: () => `Hola! mi nombre es Lucas`,
              })}
            </span>
            <br />
            {t({
              en: () => `Welcome to my Personal Website`,
              es: () => `Bienvenido a mi Página Web Personal`,
            })}
          </Typography>
          <CallToAction t={t} onContact={contactState.handleClick} />
          <SvgImage isDark={isDark} source={svg.onlineProfile} />
        </Section>
        <Section>
          <SectionBody>
            {t({
              en: () => (
                <Fragment>
                  I'm a Computer Programmer focused on Web Development with Modern Technologies.
                </Fragment>
              ),
              es: () => (
                <Fragment>
                  Soy un Programador de Computadoras centrado en el Desarrollo Web con Tecnologías
                  Modernas.
                </Fragment>
              ),
            })}
          </SectionBody>
          <SvgImage isDark={isDark} source={svg.technologies} />
        </Section>
        <Section>
          <SectionBody>
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
          </SectionBody>
          <SvgImage isDark={isDark} source={svg.website} />
        </Section>
        <section className={classes.contact} ref={contactState.ref}>
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
    </MainBar>
  )
}
export default function Home () {
  return useRoute().render.home ? <View /> : null
}