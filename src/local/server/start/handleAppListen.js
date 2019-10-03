const { process, console } = global
module.exports = function handleAppListen (PORT) {
  return () => {
    const name = (
      process.env.NODE_ENV === `production` ? `cluster worker ${process.pid}` : `dev server`
    )
    console.log(`Node ${name}: listening on port ${PORT}`)
  }
}