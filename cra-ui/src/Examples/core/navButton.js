import React from "react"
import { Route } from "react-router-dom"
import List from "@material-ui/core/List"
import WorkIcon from "@material-ui/icons/Work"
import supportedLanguages from "local/supportedLanguages"
import NavButton from "local/core/NavButton"
import BareLi from "local/core/BareLi"
import { Link } from "local/core/links"
import translations from "./translations"
import initialLocation from "./initialLocation"
const makeTargetLocation = (languageCode, foo) => ({
  pathname: `/examples/core/router/${languageCode}/example/${foo}`,
})
const makeNavButtonLocation = (command, languageCode, foo) => ({
  pathname: `/examples/core/NavButton/${command}/${languageCode}/${foo}`,
})
const otherProps = {
  translations,
  initialLocation,
  labels: {
    en: `EXAMPLE APP EN`,
    es: `EXAMPLE APP ES`,
  },
  icon: <WorkIcon />,
}
function NavButtonExample (props) {
  const { command, languageCode, foo } = props.match.params
  let button
  switch (command) {
    case "match":
    button = (
      <NavButton
        {...otherProps}
        match={true}
        languageCode={languageCode}
        location={makeTargetLocation(languageCode, foo)}
      />
    )
    break
    case "doNotMatch":
    button = (
      <NavButton
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
      <List id="nav-list"><BareLi><div>{button}</div></BareLi></List>
      <ul>
        {supportedLanguages.map(languageCode => (
          <li key={`doNotMatch-${languageCode}`}>
            <Link
              id={`doNotMatch-${languageCode}`}
              to={makeNavButtonLocation(`doNotMatch`, languageCode, `null`)}
            >
              doNotMatch {languageCode}
            </Link>
          </li>
        ))}
        <li key={`match-en-7`}>
          <Link
            id={`match-en-7`}
            to={makeNavButtonLocation(`match`, `en`, `7`)}
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
    exact path="/examples/core/NavButton/:command/:languageCode/:foo"
    component={NavButtonExample}
  />
)