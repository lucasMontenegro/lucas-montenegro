import React from "react"
import { Route } from "react-router-dom"
import supportedLanguages from "local/supportedLanguages"
import AppButton from "local/core/AppButton"
import { Link } from "local/core/links"
import translations from "./translations"
import initialLocation from "./initialLocation"
const makeTargetLocation = (languageCode, foo) => ({
  pathname: `/examples/core/routingMountPoint/${languageCode}/example/${foo}`,
})
const makeAppButtonLocation = (command, languageCode, foo) => ({
  pathname: `/examples/core/AppButton/${command}/${languageCode}/${foo}`,
})
const otherProps = {
  translations,
  initialLocation,
  labels: {
    en: `EXAMPLE APP EN`,
    es: `EXAMPLE APP ES`,
  }
}
function AppButtonExample (props) {
  const { command, languageCode, foo } = props.match.params
  let button
  switch (command) {
    case "match":
    button = (
      <AppButton
        {...otherProps}
        match={true}
        languageCode={languageCode}
        location={makeTargetLocation(languageCode, foo)}
      />
    )
    break
    case "doNotMatch":
    button = (
      <AppButton
        {...otherProps}
        match={false}
        languageCode={languageCode}
        location={null}
      />
    )
    break
    default:
    button = null
  }
  return (
    <div>
      <div id="nav-link-wrapper">{button}</div>
      <ul>
        {supportedLanguages.map(languageCode => (
          <li key={`doNotMatch-${languageCode}`}>
            <Link
              id={`doNotMatch-${languageCode}`}
              to={makeAppButtonLocation(`doNotMatch`, languageCode, `null`)}
            >
              doNotMatch {languageCode}
            </Link>
          </li>
        ))}
        <li key={`match-en-7`}>
          <Link
            id={`match-en-7`}
            to={makeAppButtonLocation(`match`, `en`, `7`)}
          >
            match en 7
          </Link>
        </li>
      </ul>
    </div>
  )
}
export default (
  <Route
    exact path="/examples/core/AppButton/:command/:languageCode/:foo"
    component={AppButtonExample}
  />
)