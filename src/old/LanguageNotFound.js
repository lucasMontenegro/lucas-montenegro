import React from "react"
import { withStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActionArea from "@material-ui/core/CardActionArea"
import Typography from "@material-ui/core/Typography"
import l10n from "./l10n"

const cards = Object.keys(l10n).map(lang => ({ ...l10n[lang].card, lang }))
export default history => {
  const children = cards.map(card => (
    <LanguageCard key={card.lang} lang={card.lang} history={history}>{card.text}</LanguageCard>
  ))
  return <Container>{children}</Container>
}

const Container = withStyles(theme => ({
  root: {
    margin: `${theme.spacing(2)}px auto`,
    maxWidth: `60ch`,
  },
}))(props => <div className={props.classes.root}>{props.children}</div>)

const LanguageCard = withStyles(theme => ({
  root: {
    margin: theme.spacing(2),
  },
}))(({ classes, children, history, lang }) => (
  <Card className={classes.root}>
    <CardActionArea
      onClick={() => {
        console.log(history);
        console.log(typeof history.push);
        history.history.push(`/${lang}`);
      }}
    >
      <CardContent>
        <Typography variant="body1">{children}</Typography>
      </CardContent>
    </CardActionArea>
  </Card>
))
