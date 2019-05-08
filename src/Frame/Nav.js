import React from "react"
import { List, ListNavLink } from "./linkList"
import config from "../config"

const navLinksByLanguage = config.navLinks.byLanguage

const Nav = ({ language, activeApp, navLinks }) => {
  const links = navLinksByLanguage[language]
  return (
    <List>
      {links.map(link => {
        const { name } = link
        return (
          <ListNavLink
            key={name}
            to={navLinks[name]}
            text={link.text}
            icon={link.icon}
            selected={name === activeApp}
          />
        )
      })}
    </List>
  )
}

export default Nav
