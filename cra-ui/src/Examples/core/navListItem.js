import React from "react"
import { Route } from "react-router-dom"
import List from "@material-ui/core/List"
import WorkIcon from "@material-ui/icons/Work"
import supportedLanguages from "local/supportedLanguages"
import NavListItem from "local/core/NavListItem"
import BareLi from "local/core/BareLi"
import { Link } from "local/core/links"
import translations from "./translations"
import initialLocation from "./initialLocation"
const makeTargetLocation = (languageCode, foo) => ({
  pathname: `/examples/core/router/${languageCode}/example/${foo}`,
})
const makeNavListItemLocation = (command, languageCode, foo) => ({
  pathname: `/examples/core/NavListItem/${command}/${languageCode}/${foo}`,
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
function NavListItemExample (props) {
  const { command, languageCode, foo } = props.match.params
  let navListItem
  switch (command) {
    case "match":
    navListItem = (
      <NavListItem
        {...otherProps}
        match={true}
        languageCode={languageCode}
        location={makeTargetLocation(languageCode, foo)}
      />
    )
    break
    case "doNotMatch":
    navListItem = (
      <NavListItem
        {...otherProps}
        match={false}
        languageCode={languageCode}
        location={null}
      />
    )
    break
    default:
    navListItem = null
  }
  return (
    <div>
      <List id="nav-list"><BareLi><div>{navListItem}</div></BareLi></List>
      <ul>
        {supportedLanguages.map(languageCode => (
          <li key={`doNotMatch-${languageCode}`}>
            <Link
              id={`doNotMatch-${languageCode}`}
              to={makeNavListItemLocation(`doNotMatch`, languageCode, `null`)}
            >
              doNotMatch {languageCode}
            </Link>
          </li>
        ))}
        <li key={`match-en-7`}>
          <Link
            id={`match-en-7`}
            to={makeNavListItemLocation(`match`, `en`, `7`)}
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
    exact path="/examples/core/NavListItem/:command/:languageCode/:foo"
    component={NavListItemExample}
  />
)