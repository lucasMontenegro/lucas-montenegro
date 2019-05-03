import React from "react"
import { Link } from "react-router-dom"
import clone from "lodash/clone"

import { withStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActionArea from "@material-ui/core/CardActionArea"
import Typography from "@material-ui/core/Typography"

import locales from "./locales"

export default {
  match: () => true,
  render (match, location) {
    if (match) {
      return {
        hideDrawer: true,
        title: `Language Not Found`,
        node: <LanguageNotFound />,
      }
    }
    return { node: null }
  },
}

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
  ({ classes }) => (
    <div key="languageNotFound" className={classes.root}>
      {cards.map(card => (
        <Card key={card.language} className={classes.card}>
          <CardLinkArea to={card.to}>
            <CardContent>
              <Typography variant="body1">{card.text}</Typography>
            </CardContent>
          </CardLinkArea>
        </Card>
      ))}
    </div>
  )
)

const cards = Object.keys(locales).map(language => ({
  ...locales[language],
  language,
  to: `/${language}/h`,
}))

class CardLinkArea extends React.Component {
  WrappedLink = React.forwardRef((itemProps, ref) => (
    <Link
      {...itemProps}
      to={this.props.to}
      innerRef={ref}
    />
  ))
  render() {
    const props = clone(this.props)
    props.component = this.WrappedLink
    delete props.to
    return <CardActionArea {...props} />
  }
}
