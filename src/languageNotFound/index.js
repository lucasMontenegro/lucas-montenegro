import React from "react"
import { withStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActionArea from "@material-ui/core/CardActionArea"
import Typography from "@material-ui/core/Typography"
import Frame from "../Frame"
import locales from "./locales"

export default {
  match () {
    return true
  },
  persistent: false,
  render (show, props, hiddenSiblings) {
    return <LanguageNotFound
      key="languageNotFound"
      hiddenSiblings={hiddenSiblings}
      history={props.history}
    />
  },
}

const cards = Object.keys(locales).map(language => ({ ...locales[language], language }))
const LanguageNotFound = withStyles(
  theme => ({
    root: {
      margin: `${theme.spacing(2)}px auto`,
      maxWidth: `60ch`,
    },
    card: {
      margin: theme.spacing(2),
    },
  })
)(
  ({ classes, history, hiddenSiblings }) => <Frame title="Language Not Found">
    <div className={classes.root}>
      {cards.map(card => {
        const path = `/${card.language}/h`
        return <Card key={card.language} className={classes.card}>
          <CardActionArea onClick={() => history.push(path)}>
            <CardContent>
              <Typography variant="body1">{card.text}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      })}
    </div>
    {hiddenSiblings}
  </Frame>
)
