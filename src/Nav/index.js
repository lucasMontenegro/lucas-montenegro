import React from "react"
import { List, ListNavLink } from "../linkList"
import links from "./links"

const locales = Object.keys(links).reduce((output,language) => {
  const locale = links[language]
  output[language] = Object.keys(locale).map(name => ({
    ...locale[name],
    name,
  }))
  return output
}, {})

const Nav = ({ language, location }) => {
  const locale = locales[language]
  return (
    <List>
      {locale.map(link => (
        <ListNavLink
          key={link.name}
          to={link.to}
          text={link.text}
          icon={link.icon}
          selected={link.isActive(location)}
        />
      ))}
    </List>
  )
}

export default Nav
