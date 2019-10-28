import languageDetector from "lib/languageDetector"
export default function findLanguage404 (location) {
  const route = this.routes.clientNotFound.find(r => r.match(location))
  if (route) {
    const { languageCode } = route
    languageDetector.set(languageCode)
    return {
      render: this.renderEmpty,
      languageCode,
      redirect: {
        ...this.locations.notFound[languageCode],
        state: location,
      },
    }
  }
  return null
}