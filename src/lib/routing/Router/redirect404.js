import languageDetector from "lib/languageDetector"
export default function redirect404 (location) {
  return {
    render: this.renderEmpty,
    redirect: {
      ...this.locations.notFound[languageDetector.get()],
      state: location,
    },
  }
}