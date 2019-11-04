import { useMemo } from "react"
export default function useRoute (location) {
  return useMemo(() => this.findRoute(location),  [location])
}