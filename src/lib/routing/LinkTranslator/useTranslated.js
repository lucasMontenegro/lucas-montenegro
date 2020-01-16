import { useCallback } from "react"
export default function useTranslated (location) {
  let savedLinks
  return useCallback(() => {
    if (!savedLinks) {
      // eslint-disable-next-line
      savedLinks = this.translate(location)
    }
    return savedLinks
  }, [location])
}