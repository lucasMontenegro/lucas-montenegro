module.exports = function cartesianProduct (collection) {
  const product = []
  const states = collection.map(set => ({ i: 0, n: set.length }))
  const reversedStates = [...states].reverse()
  const n = collection.reduce((k, set) => {
    const l = set.length
    if (l === 0) {
      throw Error(`Expected non-empty array in collection`)
    }
    return k * l
  }, 1)
  for (let i = 0; i < n; i++) {
    product.push(states.map(({ i }, k) => collection[k][i]))
    reversedStates.reduce((ready, state) => {
      if (ready) {
        return true
      }
      const x = state.i + 1
      if (x >= state.n) {
        state.i = 0
        return false
      } else {
        state.i = x
        return true
      }
    }, false)
  }
  return product
}