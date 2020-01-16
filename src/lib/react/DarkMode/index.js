import globals from "lib/utils/globals"
import React, { createContext, useContext, useState, useMemo } from "react"
const storageKey = `lib-react-dark_mode`
const initialValue = globals.window.localStorage.getItem(storageKey) === `dark`
export const DarkModeContext = createContext({
  value: initialValue,
  toggle () {},
})
DarkModeContext.displayName = `DarkModeContext`
export function useDarkMode () {
  return useContext(DarkModeContext)
}
export default function DarkMode (props) {
  const [value, saveValue] = useState(initialValue)
  const darkMode = useMemo(() => ({
    value,
    string: value ? `dark` : `light`,
    toggle () {
      globals.window.localStorage.setItem(storageKey, value ? `light` : `dark`)
      globals.setTimeout(() => saveValue(!value), 180)
    },
  }), [value, saveValue])
  return <DarkModeContext.Provider value={darkMode}>{props.children}</DarkModeContext.Provider>
}