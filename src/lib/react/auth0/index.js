import React, { createContext, useContext, useState, useEffect, useMemo } from "react"
import initAuth0 from "./initAuth0"
import makeLoginFunction from "./makeLoginFunction"
import makeLogoutFunction from "./makeLogoutFunction"
import PropTypes from "prop-types"
export const Auth0Context = createContext()
Auth0Context.displayName = `Auth0Context`
export function useAuth0 () {
  return useContext(Auth0Context)
}
export function Auth0Provider (props) {
  const [client, setClient] = useState(null)
  const [user, setUser] = useState(null)
  useEffect(() => {
    initAuth0(setClient, setUser)
  }, [])
  const { onLoginPopupTimeout, getLogoutUrl } = props
  return (
    <Auth0Context.Provider
      value={useMemo(() => ({
        user,
        login: makeLoginFunction(client, onLoginPopupTimeout, setUser),
        logout: makeLogoutFunction(user, client, getLogoutUrl),
      }), [user, client, onLoginPopupTimeout, getLogoutUrl])}
    >
      {client === null ? null : props.children}
    </Auth0Context.Provider>
  )
}
Auth0Provider.propTypes = {
  onLoginPopupTimeout: PropTypes.func,
  getLogoutUrl: PropTypes.func.isRequired,
  children: PropTypes.node,
}