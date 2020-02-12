import { useRef } from "react"
import languageDetector from "lib/languageDetector"
export default function useClientLinks (routing, route) {
  const ref = useRef(null)
  let refValue = ref.current
  const currentClient = route.clientName
  if (currentClient) { // don't do anything during redirection
    if (refValue === null || refValue.routing !== routing) { // initialize
      refValue = {
        languageCode: languageDetector.get(),
        locations: routing.clientNames.reduce((locations, clientName) => {
          if (clientName !== currentClient) {
            // route.location corresponds to the matched client
            // therefore it's already in the current language
            locations[clientName] = routing.translatedLocations[clientName].get()
          }
          return locations
        }, { [currentClient]: route.location }),
        routing,
        route,
      }
    } else {
      const refLanguage = refValue.languageCode
      const languageCode = languageDetector.get()
      if (refLanguage !== languageCode) { // translate all client locations
        const refLocations = refValue.locations
        const locations = routing.clientNames.reduce((locations, clientName) => {
          if (clientName !== currentClient) {
            const translator = routing.linkTranslators[clientName]
            const intl = translator[refLanguage].toIntl(refLocations[clientName])
            locations[clientName] = translator[languageCode].toLocal(intl)
          }
          return locations
        }, { [currentClient]: route.location }) // location already in the current language
        refValue = { languageCode, locations, routing, route }
      } else if (route !== refValue.route) {
        // navigation between clients without language change
        refValue = {
          languageCode,
          locations: { ...refValue.locations, [currentClient]: route.location },
          routing: refValue.routing,
          route,
        }
      }
    }
    ref.current = refValue
    return refValue.locations
  }
  return null
}