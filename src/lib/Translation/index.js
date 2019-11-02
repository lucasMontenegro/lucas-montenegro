import get from "lib/Translation/get"
export default class Translation {
  constructor (source) {
    this.fallbackValue = Object.values(source)[0]
    this.source = source
  }
}
Translation.prototype.get = get