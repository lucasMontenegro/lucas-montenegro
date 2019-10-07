import global from "global"
export default function isProduction () {
  return (
    global.process ? global.process.env.NODE_ENV === `production` :
    process.env.NODE_ENV === `production`
  )
}