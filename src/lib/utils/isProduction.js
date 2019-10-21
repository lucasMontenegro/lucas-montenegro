import globals from "lib/utils/globals"
export default function isProduction () {
  return (
    globals.process ? globals.process.env.NODE_ENV === `production` :
    process.env.NODE_ENV === `production`
    // WebPack will replace this last line with a boolean
  )
}