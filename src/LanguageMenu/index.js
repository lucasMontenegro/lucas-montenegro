import React from "react"
import { List, ListLink } from "../linkList"
import languageNames from "./languageNames"

const languageNamesArray = Object.keys(languageNames).map(language => ({
  language,
  name: languageNames[language],
}))

const LanguageMenu = ({ location, languageLinkFactory }) => (
  <List>
    {languageNamesArray.map(({ language, name }) => (
      <ListLink
        key={language}
        to={languageLinkFactory(language, location)}
        text={name}
      />
    ))}
  </List>
)

export default LanguageMenu
