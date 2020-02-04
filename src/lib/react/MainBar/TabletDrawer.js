import { makeStyles } from "@material-ui/core/styles"
import useTranslation from "lib/react/useTranslation"
import React from "react"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Tooltip from "@material-ui/core/Tooltip"
import ListItem from "@material-ui/core/ListItem"
import { useAppDrawerOpener } from "lib/react/AppDrawer"
//import { useDashboardOpener } from "lib/react/Dashboard"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import { FontAwesomeIcon } from "lib/react/fontAwesome"
import Divider from "@material-ui/core/Divider"
import TabletNav from "./TabletNav"
const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: theme.spacing(10) + 1,
  },
  muiLi: {
    justifyContent: `center`,
  },
  liIcon: {
    fontSize: theme.spacing(3),
    minWidth: `initial`,
  },
}), { name: `lib-react-main_bar-tablet_drawer` })
export default function TabletDrawer () {
  const classes = useStyles()
  const t = useTranslation()
  return (
    <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent">
      <List disablePadding>
        <li>
          <Tooltip
            title={t({
              en: () => `Open dashboard`,
              es: () => `Abrir panel de control`,
            })}
          >
            <ListItem
              className={classes.muiLi}
              button
              aria-controls="lib-react-app_drawer"
              onClick={useAppDrawerOpener()}
            >
            {/*
              aria-controls="lib-react-dashboard"
              onClick={useDashboardOpener()}
            >
            */}
              <ListItemIcon className={classes.liIcon}>
                <FontAwesomeIcon icon={[`fas`, `bars`]} />
              </ListItemIcon>
            </ListItem>
          </Tooltip>
        </li>
        <Divider />
        <li><TabletNav t={t} /></li>
      </List>
    </Drawer>
  )
}