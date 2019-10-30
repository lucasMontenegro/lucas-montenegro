import languageDetector from "lib/languageDetector"
export default function findLanguageOnly (location) {
  const route = this.routes.languageOnly.find(r => r.match(location))
  if (route) {
    const { languageCode } = route
    languageDetector.set(languageCode)
    return {
      render: this.renderEmpty,
      redirect: this.locations.home[languageCode],
    }
  }
  return null
}