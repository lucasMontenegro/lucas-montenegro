import React from "react"
import { makeStyles } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
import HomeIcon from "@material-ui/icons/Home"
import createBaseClient from "local/core/createBaseClient"
import makeTranslations from "local/makeTranslations"
import initialLocation from "./initialLocation"
import linkTranslators from "./linkTranslators"
const BaseClient = createBaseClient({
  appName: `main`,
  clientName: `home`,
  initialLocation,
  linkTranslators,
})
const subtitles = makeTranslations({
  en: `Home`,
  es: `Inicio`,
})
const icons = makeTranslations(() => <HomeIcon />)
const messages = makeTranslations({
  en: `Welcome to my Personal Website`,
  es: `Bienvenido a mi Página Web Personal`,
})
const useStyles = makeStyles({
  root: {
    flexShrink: 0,
    flexGrow: 1, // set height to 100%
    width: `100%`,
  },
}, { name: `Home` })
export default function HomeClient (props) {
  const classes = useStyles()
  return (
    <BaseClient
      {...props}
      subtitles={subtitles}
      icons={icons}
    >
      <div className={classes.root}>
        <Typography variant="h5" component="h1">{messages[props.languageCode]}</Typography>
      </div>
    </BaseClient>
  )
}