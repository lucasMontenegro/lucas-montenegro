import React from "react"
import Typography from "@material-ui/core/Typography"
import createBaseClient from "new/local/paperbase/createBaseClient"
import useStyles from "new/local/home/useStyles"
import translations from "new/local/home/translations"
export default function home (appName, routing) {
  const BaseClient = createBaseClient({
    appName,
    clientName: `home`,
    routing,
  })
  function Home (props) {
    const classes = useStyles()
    return (
      <BaseClient
        {...props}
        subtitles={translations.subtitles}
        icons={translations.icons}
      >
        <div className={classes.root}>
          <Typography variant="h5" component="h1">
            {translations.messages[props.languageCode]}
          </Typography>
        </div>
      </BaseClient>
    )
  }
  Home.propTypes = createBaseClient.propTypes
  return Home
}