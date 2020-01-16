const { console } = global
module.exports =  function simpleErrorCallback (e) {
  if (e) {
    console.error(e)
  }
}