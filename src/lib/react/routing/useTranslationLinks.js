import { useMemo } from "react"
import languageDetector from "lib/languageDetector"
export default function useTranslationLinks (routing, route) {
  const baseLinks = useMemo(() => {
    const { languageNames } = routing
    return routing.languageCodes.map(languageCode => ({
      languageCode,
      text: languageNames[languageCode],
    }))
  }, [routing])
  const { clientName } = route
  const translators = useMemo(() => (
    clientName ? routing.linkTranslators[clientName] : null
  ), [routing, clientName])
  return useMemo(() => {
    if (translators) {
      return {
        get (render) {
          if (this.links) return this.links
          if (render) {
            const oldLanguage = languageDetector.get()
            const intl = translators[oldLanguage].toIntl(route.location)
            return this.links = baseLinks.filter(link => link.languageCode !== oldLanguage)
              .map(link => {
                const { languageCode } = link
                return {
                  languageCode,
                  location: translators[languageCode].toLocal(intl),
                  text: link.text,
                }
              })
          }
          return []
        },
      }
    }
    return {
      links: [],
      get () {
        return this.links
      },
    }
  }, [translators, route, baseLinks])
}