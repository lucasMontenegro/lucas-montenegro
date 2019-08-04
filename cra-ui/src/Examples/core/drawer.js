import React from "react"
import { Route } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Typography from "@material-ui/core/Typography"

import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import WorkIcon from "@material-ui/icons/Work"

import { DrawerState, DrawerView } from "local/core/drawer"
import BareLi from "local/core/BareLi"
import config from "local/config"
function DrawerExample (props) {
  const { languageCode, foo } = props.match.params
  return (
    <DrawerState
      Component={DrawerViewWrapper}
      other={{ languageCode, foo }}
    />
  )
}
const DrawerViewWrapper = withStyles(
  theme => ({
    appBar: {
      width: `calc(100vw - ${config.drawerWidth}px)`,
      [theme.breakpoints.down(config.breakpointWidth)]: {
        width: `100vw`,
      },
    },
  })
)(
  function DrawerViewWrapper ({ classes, languageCode, drawerState, foo }) {
    return (
      <div>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              id="open-drawer"
              aria-controls="temporary-drawer"
              aria-haspopup="true"
              onClick={drawerState.open}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DrawerView
          languageCode={languageCode}
          drawerState={drawerState}
          navButtons={
            [1, 2, 3]
              .map(n => ({ id: `button${n}`, text: `Button ${n}` }))
              .map(({ id, text }) => (
                <BareLi key={id}>
                  <div>
                    <ListItem button id={id} component="button" onClick={drawerState.close}>
                      <ListItemAvatar><Avatar><WorkIcon /></Avatar></ListItemAvatar>
                      <ListItemText primary={text} />
                    </ListItem>
                  </div>
                </BareLi>
              ))
          }
        >
          <div id="foo">{foo}</div>
          <Typography variant="body2">
            Mollit irure in culpa ut anim ex nostrud aute ut in pariatur ad nostrud in. Lorem ipsum id ea consequat consectetur sunt excepteur duis fugiat elit eiusmod ex ut dolore duis commodo ut ut ea. Consectetur minim consectetur velit ad duis officia dolore amet ut. Lorem ipsum dolor in sit irure consectetur commodo cupidatat culpa consequat deserunt.
          </Typography>
        </DrawerView>
      </div>
    )
  }
)
export default (
  <Route exact path="/examples/core/drawer/:languageCode/:foo" component={DrawerExample} />
)