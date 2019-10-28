import languageDetector from "lib/languageDetector"
export default function findRoot (location) {
  if (this.routes.matchRoot(location)) {
    const languageCode = languageDetector.get()
    return {
      render: this.renderEmpty,
      languageCode,
      redirect: this.locations.home[languageCode],
    }
  }
  return null
}