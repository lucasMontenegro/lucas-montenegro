import React from "react"
import { Route } from "react-router-dom"
import { makeStyles, ThemeProvider } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import useViewState from "local/core/useViewState"
import theme from "local/theme"
function P (props) {
  return <Typography {...props} color="textSecondary" component="p" />
}
const useStyles = makeStyles({
  root: {
    padding: 32,
  },
  card: {
    minWidth: 275,
    maxWidth: 512,
    margin: `0 auto`,
  },
}, { name: `UseViewStateExample` })
function booleanToString (boolean) {
  return boolean ? `true` : `false`
}
function UseViewStateExample () {
  const classes = useStyles()
  const viewState = useViewState(100)
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <P>isMobile: <span id="is-mobile">{booleanToString(viewState.isMobile)}</span></P>
          <P>
            {`drawer.isOpen: `}
            <span id="drawer-is-open">{booleanToString(viewState.drawer.isOpen)}</span>
          </P>
        </CardContent>
        <CardActions>
          <Button size="small" id="open-drawer" onClick={viewState.drawer.open}>
            Open Drawer
          </Button>
          <Button size="small" id="close-drawer" onClick={viewState.drawer.close}>
            Close Drawer
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}
function UseViewStateExampleWrapper (props) {
  return (
    <ThemeProvider theme={theme}>
      <UseViewStateExample {...props} />
    </ThemeProvider>
  )
}
export default (
  <Route exact path="/examples/core/useViewState" component={UseViewStateExampleWrapper} />
)