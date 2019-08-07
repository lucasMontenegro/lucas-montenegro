import React, { Fragment } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import supportedLanguages from "local/supportedLanguages"
import AppLocation from "local/core/AppLocation"
import { Link } from "local/core/links"
import translations from "./translations"
import initialLocation from "./initialLocation"
function AppLocationExampleRouter (props) {
  return (
    <Switch>
      <Redirect
        exact path="/examples/core/AppLocation"
        to="/examples/core/AppLocation/false/en/0"
      />
      <Route
        exact path="/examples/core/AppLocation/:match/:languageCode/:foo"
        component={AppLocationExample}
      />
    </Switch>
  )
}
export default (
  <Route path="/examples/core/AppLocation" component={AppLocationExampleRouter} />
)
const makeTargetLocation = (languageCode, foo) => ({
  pathname: `/examples/core/router/${languageCode}/example/${foo}`,
})
const makeExampleLocation = (match, languageCode, foo) => ({
  pathname: `/examples/core/AppLocation/${match}/${languageCode}/${foo}`,
})
const useStyles = makeStyles({
  root: {
    padding: 32,
  },
  card: {
    minWidth: 275,
    maxWidth: 512,
    margin: `0 auto`,
  },
})
function AppLocationExample (props) {
  const { match: matchProp, languageCode, foo } = props.match.params
  const match = matchProp === `true`
  const classes = useStyles()
  const location = match ? makeTargetLocation(languageCode, foo) : null
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <AppLocation
            match={match}
            languageCode={languageCode}
            location={location}
            translations={translations}
            initialLocation={initialLocation}
          >
            <AppLocationChildExample foo={foo} />
          </AppLocation>
          <List disablePadding>
            {[`true`, `false`].map(match => (
              <Fragment key={match}>
                {supportedLanguages.map(languageCode => (
                  <Fragment key={languageCode}>
                    {[`123`, `456`].map(foo => (
                      <ListItem key={foo}>
                        <Link to={makeExampleLocation(match, languageCode, foo)}>
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
function P (props) {
  return <Typography {...props} color="textSecondary" component="p" />
}
function AppLocationChildExample ({ match, languageCode, location, foo }) {
  return (
    <Fragment>
      <P>match: <span id="match">{match ? `true` : `false`}</span></P>
      <P>languageCode: <span id="languageCode">{languageCode}</span></P>
      <P>pathname: <span id="pathname">{location ? location.pathname : `null`}</span></P>
      <P>foo: <span id="foo">{foo}</span></P>
    </Fragment>
  )
}