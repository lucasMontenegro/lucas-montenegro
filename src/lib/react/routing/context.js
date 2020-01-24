import React, { createContext, useMemo, useContext } from "react"
import Router from "./Router"
import useClientLinks from "./useClientLinks"
export const RoutingContext = createContext({
  routing: null,
  route: {
    render: {},
    redirect: null,
  },
})
RoutingContext.displayName = `RoutingContext`
export function RoutingProvider (props) {
  const { routing, location } = props
  const router = useMemo(() => new Router(routing), [routing])
  const route = useMemo(() => router.findRoute(location), [router, location])
  const clientLinks = useClientLinks(props.clientLinks, routing, route)
  const value = useMemo(() => ({ routing, route, clientLinks }), [routing, route, clientLinks])
  return <RoutingContext.Provider value={value}>{props.children}</RoutingContext.Provider>
}
export function useRoute () {
  return useContext(RoutingContext).route
}
export function useRoutingContext () {
  return useContext(RoutingContext)
}