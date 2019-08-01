import React from "react"
import { Route } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import MenuIcon from "@material-ui/icons/Menu"
import Typography from "@material-ui/core/Typography"
import { DrawerState, DrawerView } from "local/core/drawer"
import config from "local/config"
function DrawerExample (props) {
  const { languageCode, foo } = props.match.params
  return (
    <DrawerState
      Component={DrawerViewWrapper}
      componentProps={{ languageCode, foo }}
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
        <DrawerView languageCode={languageCode} drawerState={drawerState}>
          <div>
            <Button id="close-drawer-from-app" variant="contained" onClick={drawerState.close}>
              CLOSE DRAWER
            </Button>
          </div>
          <div id="foo">{foo}</div>
          <Typography style={{ color: `white` }} variant="body2">
            Reprehenderit in ut pariatur minim dolore amet cillum in reprehenderit est. In commodo veniam reprehenderit sit amet ut veniam incididunt culpa ea minim excepteur. Ut velit veniam commodo id tempor nisi sed cupidatat ut amet qui enim voluptate minim sed cupidatat officia laboris. Pariatur commodo duis aute adipisicing labore laborum sit excepteur amet minim ut in in. Esse et anim reprehenderit laborum sint exercitation enim voluptate anim ullamco eiusmod laboris ex irure culpa. Aliqua velit duis non commodo nostrud id minim nisi anim mollit do exercitation. Officia ea est nisi quis dolor amet laborum sit cillum nulla reprehenderit eiusmod sint aliqua. Sunt exercitation aute minim in eiusmod velit fugiat voluptate duis quis minim. Dolor amet sint cillum est ut cillum do aliqua ut minim laboris incididunt magna proident qui consectetur. Veniam anim fugiat consectetur fugiat laboris commodo labore fugiat occaecat ut ex mollit adipisicing sunt magna duis in. Commodo excepteur sint deserunt velit ut eu ullamco nostrud non deserunt eu minim in aliqua. Aute sunt irure consectetur non sunt ut est aliqua ut do labore in qui aliquip anim officia. Quis ullamco consequat anim nulla aliqua cillum labore excepteur exercitation ex adipisicing consequat exercitation in est excepteur aute.
          </Typography>
        </DrawerView>
      </div>
    )
  }
)
export default (
  <Route exact path="/examples/core/drawer/:languageCode/:foo" component={DrawerExample} />
)