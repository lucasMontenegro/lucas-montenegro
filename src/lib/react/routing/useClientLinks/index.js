import useBaseLinks from "./useBaseLinks"
import useClientLocations from "./useClientLocations"
import { useMemo } from "react"
export default function useClientLinks (render, routing, route) {
  const baseLinks = useBaseLinks(render)
  const locations = useClientLocations(routing, route)
  return useMemo(() => {
    if (locations === null) {
      return []
    }
    const currentClient = route.clientName
    return baseLinks.map(link => {
      const { clientName } = link
      return {
        clientName,
        active: currentClient === clientName,
        render: link.render,
        location: locations[clientName],
      }
    })
  }, [locations, baseLinks, route])
}