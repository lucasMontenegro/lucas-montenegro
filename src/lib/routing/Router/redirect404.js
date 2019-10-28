import languageDetector from "lib/languageDetector"
export default function redirect404 (location) {
  const languageCode = languageDetector.get()
  return {
    render: this.renderEmpty,
    languageCode,
    redirect: {
      ...this.locations.notFound[languageCode],
      state: location,
    },
  }
}