import React, { createContext, useContext, useState, useRef, useEffect, useMemo } from "react"
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
  const firstRender = useRef(true)
  const redirectUri = props.redirectUri || (x => x)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      initAuth0(redirectUri, setClient, setUser)
    }
  }, [redirectUri])
  const ready = client !== null
  const { onLoginPopupTimeout } = props
  return (
    <Auth0Context.Provider
      value={useMemo(() => ({
        user,
        login: makeLoginFunction(ready, client, onLoginPopupTimeout, setUser),
        logout: makeLogoutFunction(ready, user !== null, client),
      }), [user, ready, client, onLoginPopupTimeout])}
    >
      {ready ? props.children : null}
    </Auth0Context.Provider>
  )
}
Auth0Provider.propTypes = {
  redirectUri: PropTypes.func,
  onLoginPopupTimeout: PropTypes.func,
  children: PropTypes.node,
}