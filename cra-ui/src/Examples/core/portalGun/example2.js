import React, { Fragment } from "react"
import { Route } from "react-router-dom"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListSubheader from "@material-ui/core/ListSubheader"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import WorkIcon from "@material-ui/icons/Work"
import PortalGun from "local/core/PortalGun"
import BareLi from "local/core/BareLi"
const appNames = [`Foo`, `Bar`]
const mountingPoints = [`Left`, `Right`]
function PortalExample2 () {
  return (
    <PortalGun appNames={appNames} mountingPoints={mountingPoints} Component={PortalCallback} />
  )
}
export default (
  <Route exact path="/examples/core/portalGun/example2" component={PortalExample2} />
)
function PortalCallback ({ portals, isDrawer }) {
  return (
    <Fragment>
      {appNames.map(appName => <Client key={appName} appName={appName} portals={portals} />)}
      <Drawer variant="temporary" open={true}>
        <div style={{ width: 256 }}>
          {mountingPoints.map(mountingPoint => (
            <List
              key={mountingPoint}
              subheader={<ListSubheader>{mountingPoint} List</ListSubheader>}
            >
              {appNames.map(appName => {
                const { RedPortal } = portals[appName][mountingPoint]
                return <RedPortal key={appName} Component={BareLi} />
              })}
            </List>
          ))}
        </div>
      </Drawer>
    </Fragment>
  )
}
function Client ({ appName, portals }) {
  return (
    <Fragment>
      {mountingPoints.map(mountingPoint => {
        const { BluePortal } = portals[appName][mountingPoint]
        return (
          <BluePortal key={mountingPoint}>
            <ListItem button id={`${mountingPoint}${appName}Button`}>
              <ListItemAvatar><Avatar><WorkIcon /></Avatar></ListItemAvatar>
              <ListItemText primary={`${appName} Button`} />
            </ListItem>
          </BluePortal>
        )
      })}
    </Fragment>
  )
}