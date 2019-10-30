import languageDetector from "lib/languageDetector"
export default function findClient (location) {
  const matcher = this.matchers.client.find(m => m.match(location))
  if (matcher) {
    const { languageCode, render } = matcher
    languageDetector.set(languageCode)
    return { render, redirect: null }
  }
  return null
}