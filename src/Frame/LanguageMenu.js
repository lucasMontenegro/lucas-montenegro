import React from "react"
import { List, ListLink } from "./linkList"
import config from "../config"

const { languages, translateLocationFrom } = config

const LanguageMenu = ({ language, activeApp, location }) => {
  const translate = translateLocationFrom[language].for[activeApp]
  return (
    <List>
      {languages.map(({ code, displayName }) => (
        <ListLink
          key={code}
          to={translate[code](location)}
          text={displayName}
        />
      ))}
    </List>
  )
}

export default LanguageMenu
