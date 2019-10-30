import languageDetector from "lib/languageDetector"
export default function findRoot (location) {
  if (this.routes.matchRoot(location)) {
    return {
      render: this.renderEmpty,
      redirect: this.locations.home[languageDetector.get()],
    }
  }
  return null
}