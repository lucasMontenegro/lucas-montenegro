import React, { Fragment } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import supportedLanguages from "local/supportedLanguages"
import makeAppLocation from "local/core/makeAppLocation"
import { Link } from "local/core/links"
import translations from "./translations"
import initialLocation from "./initialLocation"
function AppLocationExampleRouter (props) {
  return (
    <Switch>
      <Redirect
        exact path="/examples/core/makeAppLocation"
        to="/examples/core/makeAppLocation/false/en/0"
      />
      <Route
        exact path="/examples/core/makeAppLocation/:match/:languageCode/:foo"
        component={AppLocationExample}
      />
    </Switch>
  )
}
export default (
  <Route path="/examples/core/makeAppLocation" component={AppLocationExampleRouter} />
)
function P (props) {
  return <Typography {...props} color="textSecondary" component="p" />
}
const makeTargetLocation = (languageCode, foo) => ({
  pathname: `/examples/core/router/${languageCode}/example/${foo}`,
})
const makeExampleLocation = (match, languageCode, foo) => ({
  pathname: `/examples/core/makeAppLocation/${match}/${languageCode}/${foo}`,
})
const useStyles = makeStyles({
  root: {
    padding: 32,
  },
  card: {
    width: 512,
    margin: `0 auto`,
  },
})
const useAppLocation = makeAppLocation(initialLocation, translations)
function AppLocationExample (props) {
  const { match: matchProp, languageCode, foo } = props.match.params
  const match = matchProp === `true`
  const newLocation = match ? makeTargetLocation(languageCode, foo) : null
  const location = useAppLocation(match, languageCode, newLocation)
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <P>match: <span id="match">{match ? `true` : `false`}</span></P>
          <P>languageCode: <span id="language-code">{languageCode}</span></P>
          <P>foo: <span id="foo">{foo}</span></P>
          <P>pathname: <span id="pathname">{location ? location.pathname : `undefined`}</span></P>
          <List disablePadding>
            {[`true`, `false`].map(match => (
              <Fragment key={match}>
                {supportedLanguages.map(languageCode => (
                  <Fragment key={languageCode}>
                    {[`456`, `789`].map(foo => (
                      <ListItem key={foo}>
                        <Link
                          id={`${match}-${languageCode}-${foo}`}
                          to={makeExampleLocation(match, languageCode, foo)}
                        >
                          {match} {languageCode} {foo}
                        </Link>
                      </ListItem>
                    ))}
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  )
}