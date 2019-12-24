import React, { createContext, useMemo, useContext } from "react"
import Router from "./Router"
export const RoutingContext = createContext({
  routing: null,
  route: {
    render: {},
    redirect: null,
  },
})
RoutingContext.displayName = `RoutingContext`
export function RoutingProvider ({ routing, location, children }) {
  const router = useMemo(() => new Router(routing), [routing])
  const value = useMemo(() => ({
    routing,
    route: router.findRoute(location),
  }), [routing, router, location])
  return <RoutingContext.Provider value={value}>{children}</RoutingContext.Provider>
}
export function useRoute () {
  return useContext(RoutingContext).route
}
export function useRoutingContext () {
  return useContext(RoutingContext)
}