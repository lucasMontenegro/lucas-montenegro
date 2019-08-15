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
})
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
  return (
    viewState.isMobile ? (
      <MuiDrawer
        id="temporary-drawer"
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        variant="temporary"
        open={viewState.drawer.isOpen}
        onClose={viewState.drawer.close}
        PaperProps={{ style: { width } }}
      >
        {content}
      </MuiDrawer>
    ) :
    (
      <MuiDrawer id="permanent-drawer" variant="permanent" PaperProps={{ style: { width } }}>
        {content}
      </MuiDrawer>
    )
  )
}