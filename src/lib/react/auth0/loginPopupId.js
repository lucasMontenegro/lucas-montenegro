export default {
  count: 0,
  get () {
    return ++this.count
  },
  check (id) {
    return this.count !== id
  },
}