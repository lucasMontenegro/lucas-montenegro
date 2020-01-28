import React, { createContext, useContext, useState, useCallback } from "react"
import Drawer from "./Drawer"
import PropTypes from "prop-types"
export const AppDrawerContext = createContext(() => {})
AppDrawerContext.displayName = `AppDrawerContext`
export function useAppDrawerOpener () {
  return useContext(AppDrawerContext)
}
export default function AppDrawer (props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} windowTitle={props.windowTitle}>
      <AppDrawerContext.Provider value={useCallback(() => setIsOpen(true), [setIsOpen])}>
        {props.children}
      </AppDrawerContext.Provider>
    </Drawer>
  )
}
AppDrawer.propTypes = { children: PropTypes.node }