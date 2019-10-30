export default function findRoute (location) {
  return (
    this.findRoot(location)
    || this.findLanguageOnly(location)
    || this.findClient(location)
    || this.findUnknownClient(location)
    || this.redirect404(location)
  )
}