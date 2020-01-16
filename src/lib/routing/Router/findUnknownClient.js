import languageDetector from "lib/languageDetector"
export default function findUnknownClient (location) {
  const matcher = this.matchers.unknownClient.find(m => m.match(location))
  if (matcher) {
    const { languageCode } = matcher
    languageDetector.set(languageCode)
    return {
      render: this.renderEmpty,
      redirect: {
        ...this.locations.notFound[languageCode],
        state: location,
      },
    }
  }
  return null
}