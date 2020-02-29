import React, { createContext, useContext, useState, useEffect, useMemo, Fragment } from "react"
import initAuth0 from "./initAuth0"
import useLoginTimeoutAlert from "./useLoginTimeoutAlert"
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
  const lta = useLoginTimeoutAlert()
  const openLta = lta.open
  const { getLogoutUrl } = props
  return (
    <Auth0Context.Provider
      value={useMemo(() => ({
        user,
        login: makeLoginFunction(client, openLta, setUser),
        logout: makeLogoutFunction(user, client, getLogoutUrl),
      }), [user, client, openLta, getLogoutUrl])}
    >
      {client === null ? null : (
        <Fragment>
          {lta.node}
          {props.children}
        </Fragment>
      )}
    </Auth0Context.Provider>
  )
}
Auth0Provider.propTypes = {
  getLogoutUrl: PropTypes.func.isRequired,
  children: PropTypes.node,
}