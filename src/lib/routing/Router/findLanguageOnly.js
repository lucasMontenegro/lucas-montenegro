import languageDetector from "lib/languageDetector"
export default function findLanguageOnly (location) {
  const matcher = this.matchers.languageOnly.find(m => m.match(location))
  if (matcher) {
    const { languageCode } = matcher
    languageDetector.set(languageCode)
    return {
      render: this.renderEmpty,
      redirect: this.locations.home[languageCode],
    }
  }
  return null
}