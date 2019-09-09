import React, { Fragment } from "react"
import { makeStyles } from "@material-ui/styles"
import MuiDrawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import makeTranslations from "local/makeTranslations"
const navLabels = makeTranslations({
  en: `Navigation buttons`,
  es: `Botones de navegación`,
})
const closeLabels = makeTranslations({
  en: `Close left drawer`,
  es: `Cerrar panel lateral`,
})
const useStyles = makeStyles({
  close: {
    textAlign: `right`,
  },
  paper: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}, { name: `Drawer` })
export default function Drawer ({ languageCode, width, viewState, navLinks, children }) {
  const classes = useStyles()
  const content = (
    <Fragment>
      {viewState.isMobile && (
        <div className={classes.close}>
          <IconButton
            id="close-temporary-drawer"
            aria-label={closeLabels[languageCode]}
            aria-controls="temporary-drawer"
            onClick={viewState.drawer.close}
          >
            <CloseIcon />
          </IconButton>
        </div>
      )}
      {children}
      <nav id="drawer-nav" aria-label={navLabels[languageCode]}><List>{navLinks}</List></nav>
    </Fragment>
  )
  const PaperProps = { style: { width } }
  const drawerClasses = { paper: classes.paper }
  return (
    viewState.isMobile ? (
      <MuiDrawer
        id="temporary-drawer"

        // ModalProps={{ keepMounted: true }}
        // Better open performance on mobile.
        // Doesn't work with portals

        classes={drawerClasses}
        variant="temporary"
        open={viewState.drawer.isOpen}
        onClose={viewState.drawer.close}
        PaperProps={PaperProps}
      >
        {content}
      </MuiDrawer>
    ) :
    (
      <MuiDrawer id="permanent-drawer" classes={drawerClasses} variant="permanent" PaperProps={PaperProps}>
        {content}
      </MuiDrawer>
    )
  )
}