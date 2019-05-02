import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import locales from "./locales"

const Nav = ({ language, history }) => {
  const { home } = locales[language]
  return (
    <List>
      <ListItem button key="home" onClick={() => history.push(home.to)}>
        <ListItemIcon>{home.icon}</ListItemIcon>
        <ListItemText primary={home.text} />
      </ListItem>
    </List>
  )
}

export default Nav
