import languageDetector from "lib/languageDetector"
export default function findClient (location) {
  const route = this.routes.client.find(r => r.match(location))
  if (route) {
    const { languageCode, render } = route
    languageDetector.set(languageCode)
    return { render, languageCode, redirect: null }
  }
  return null
}