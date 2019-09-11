import React, { useState, Fragment } from "react"
import { Route } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Drawer from "@material-ui/core/Drawer"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import makeTranslations from "local/makeTranslations"
import { spyOnCreateNotFound } from "local/clients/createNotFound"
import { Link } from "local/core/links"
import PropTypes from "prop-types"
import { languageCodePropType } from "local/supportedLanguages"
import { makeTranslationsPropType } from "local/makeTranslations"
const routing = {
  locations: {
    home: makeTranslations(languageCode => ({
      pathname: `/examples/clients/createNotFound/home/${languageCode}`,
    })),
    notFound: makeTranslations(languageCode => ({
      pathname: `/examples/clients/createNotFound/notFound/${languageCode}`,
    })),
  },
}
const initialClientLocations = {
  home: routing.locations.home.en,
  notFound: routing.locations.notFound.en,
}
const initialState = {
  languageCode: `en`,
  typeofState: `object`,
  typeofReferrer: `object`,
  pathname: `/404`,
  search: `?x=bar&y=baz`,
  hash: `#hash`,
}
const inputFields = Object.keys(initialState)
function Example (props) {
  const [clientLocations, setClientLocations] = useState(initialClientLocations)
  const [state, setState] = useState(initialState)
  function update (key) {
    return e => {
      const { value } = e.target
      setState(state => ({ ...state, [key]: value }))
    }
  }
  function updateClientLocations () {
    const { home, notFound } = routing.locations
    const { languageCode } = state
    setClientLocations({
      home: home[languageCode],
      notFound: {
        ...notFound[languageCode],
        state: (
          state.typeofState === `undefined` ? undefined :
          {
            referrer: (
              state.typeofReferrer === `undefined` ? undefined :
              {
                pathname: state.pathname,
                search: state.search,
                hash: state.hash,
              }
            ),
          }
        ),
      },
    })
  }
  const { appName } = props.match.params
  return (
    <Fragment>
      <Drawer variant="permanent" PaperProps={{ style: { width: 256 } }}>
        <h4>Apps</h4>
        <ul>
          <li><Link id="homeLink" to={clientLocations.home}>home</Link></li>
          <li><Link id="notFoundLink" to={clientLocations.notFound}>notFound</Link></li>
        </ul>
        <h4>Input</h4>
        {inputFields.map(key => (
          <div key={key}>
            <TextField
              id={`${key}Input`}
              label={key}
              value={state[key]}
              onChange={update(key)}
            />
          </div>
        ))}
        <div>
          <Button
            id="updateClientLocations"
            variant="outlined"
            color="primary"
            onClick={updateClientLocations}
          >
            UPDATE LINKS
          </Button>
        </div>
      </Drawer>
      <div style={{ paddingLeft: 264 }}>
        {appName === `home` && <h4 id="home">Home</h4>}
        <NotFound
          match={appName === `notFound`}
          languageCode={props.match.params.languageCode}
          location={props.location}
          anotherProp="foo"
        />
      </div>
    </Fragment>
  )
}
export default (
  <Route path="/examples/clients/createNotFound/:appName/:languageCode" component={Example} />
)
function createBaseClientSpy (options) {
  const {
    clientName,
    appName,
    initialLocation,
    linkTranslators,
    customClientLocation,
  } = options
  const useStyles = makeStyles({
    content: {
      minHeight: `100vh`,
      padding: 16,
      maxWidth: 1024,
      margin: `0 auto`,
      display: `flex`,
      flexDirection: `column`,
      alignItems: `center`,
      justifyContent: `center`,
    },
  }, { name: `BaseClientSpy` })
  function BaseClientSpy (props) {
    const {
      match,
      languageCode,
      subtitles,
      icons,
      children,
      anotherProp,
    } = props
    const classes = useStyles()
    return (
      <div id="BaseClientSpy">
        <h4>Base Client Spy</h4>
        <h5>options</h5>
        <ul>
          <li>clientName: <span id="clientName">{clientName}</span></li>
          <li>appName: <span id="appName">{appName}</span></li>
          <li>initialLocation: <span id="initialLocation">{initialLocation}</span></li>
          <li>linkTranslators: <span id="linkTranslators">{linkTranslators}</span></li>
          <li>
            customClientLocation: &nbsp;
            <span id="customClientLocation">{typeof customClientLocation}</span>
          </li>
        </ul>
        <h5>props</h5>
        <ul>
          <li>subtitle: <span id="subtitle">{subtitles[languageCode]}</span></li>
          <li>icon: <span id="icon">{icons[languageCode]}</span></li>
          <li>anotherProp: <span id="anotherProp">{anotherProp}</span></li>
        </ul>
        {match && (
          <Fragment>
            <h4>Not Found</h4>
            <div className={classes.content}>{children}</div>
          </Fragment>
        )}
      </div>
    )
  }
  BaseClientSpy.propTypes = {
    match: PropTypes.bool.isRequired,
    languageCode: languageCodePropType.isRequired,
    subtitles: makeTranslationsPropType(PropTypes.string).isRequired,
    icons: makeTranslationsPropType(PropTypes.element).isRequired,
    children: PropTypes.element.isRequired,
    anotherProp: PropTypes.string.isRequired,
  }
  return BaseClientSpy
}
const createNotFound = spyOnCreateNotFound({ createBaseClient: createBaseClientSpy })
const NotFound = createNotFound({
  appName: `appName`,
  initialLocation: `initialLocation`,
  linkTranslators: `linkTranslators`,
  routing,
})