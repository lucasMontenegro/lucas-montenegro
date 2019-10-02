import React, { Fragment } from "react"
import { Route } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import supportedLanguages from "local/supportedLanguages"
import makeTranslations from "local/makeTranslations"
import NotFoundView from "./index"
import routing from "./exampleRouting"
const referrerValues = {
  stringReferrer: `referrer`,
  nullReferrer: null,
}
function NotFoundViewExample (props) {
  const { languageCode, hidden, referrer } = props.match.params
  return (
    <NotFoundView
      hidden={hidden === `hidden`}
      languageCode={languageCode}
      routing={routing}
      referrer={referrerValues[referrer]}
      BaseClient={BaseClientSpy}
      clientProps={exampleClientProps}
    />
  )
}
export default (
  <Route
    exact path="/examples/clients/createNotFound/NotFoundView/:languageCode/:hidden/:referrer"
    component={NotFoundViewExample}
  />
)
const exampleClientProps = { // pass the type checking
  match: true,
  languageCode: `en`,
  location: {},
  viewState: {
    isMobile: true,
    drawer: { isOpen: true, open () {}, close () {} },
  },
  drawerWidth: 0,
  logo: <div>logo</div>,
  titles: makeTranslations(() => `title`),
}
const BaseClientSpy = (useStyles => function BaseClientSpy (props) {
  const classes = useStyles()
  return (
    <div id="BaseClient">
      {[`icons`, `subtitles`].map(key => (
        <Fragment key={key}>
          <h4>{key}</h4>
          <ul>
            {supportedLanguages.map(languageCode => (
              <li key={languageCode}>
                {languageCode}: &nbsp;
                <span id={`${key}-${languageCode}`}>{props[key][languageCode]}</span>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
      <div className={classes.content}>{props.children}</div>
    </div>
  )
})(makeStyles({
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
}, { name: `BaseClientSpy` }))