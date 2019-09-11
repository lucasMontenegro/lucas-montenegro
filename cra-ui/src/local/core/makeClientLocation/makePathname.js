export default {
  home (languageCode) {
    return `/${languageCode}/home`
  },
  example (languageCode, foo) {
    return `/${languageCode}/example/${foo}`
  },
}