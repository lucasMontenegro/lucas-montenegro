import React from "react"
import { Route } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
import { DrawerView } from "local/core/drawer"
import { AppPanelView } from "local/core/AppPanel"
import theme from "local/darkTheme"
const Ul = withStyles({
  root: {
    listStyle: `none`,
    margin: 0,
    padding: 0,
    "& > li": {
      display: `block`,
    },
  },
})(
  function Ul ({ classes, ...other }) {
    return <ul className={classes.root} {...other} />
  }
)
const panelNames = [`top`, `middle`, `bottom`]
const drawerState = { isOpen: true, open(){}, close(){} }
function AppPanelExample (props) {
  const { panelName: activePanel } = props.match.params
  return (
    <ThemeProvider theme={theme}>
      <DrawerView languageCode="en" drawerState={drawerState}>
        <Ul>
          {panelNames.map(panelName => {
            const match = panelName === activePanel
            const id = `${panelName}-panel`
            return (
              <li key={id}>
                <AppPanelView
                  id={id}
                  expanded={match}
                  label="minim dolore"
                  title={panelName}
                  location={`/examples/core/AppPanel/${panelName}`}
                >
                  <Typography variant="body2">lorem ipsum</Typography>
                </AppPanelView>
              </li>
            )
          })}
        </Ul>
      </DrawerView>
    </ThemeProvider>
  )
}
export default (
  <Route exact path="/examples/core/AppPanel/:panelName" component={AppPanelExample} />
)