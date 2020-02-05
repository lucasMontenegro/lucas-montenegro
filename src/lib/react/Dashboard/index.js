import React, { createContext, useContext, useState, useCallback } from "react"
import Drawer from "./Drawer"
import PropTypes from "prop-types"
export const DashboardContext = createContext(() => {})
DashboardContext.displayName = `DashboardContext`
export function useDashboardOpener () {
  return useContext(DashboardContext)
}
export default function Dashboard (props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <DashboardContext.Provider value={useCallback(() => setIsOpen(true), [setIsOpen])}>
        {props.children}
      </DashboardContext.Provider>
    </Drawer>
  )
}
Dashboard.propTypes = { children: PropTypes.node }