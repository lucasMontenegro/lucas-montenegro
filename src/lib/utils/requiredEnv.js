import globals from "lib/utils/globals"
export default function requiredEnv (key) {
  const { env } = globals.process
  if (key in env) {
    return env[key]
  }
  throw Error(`process.env.${key} is required`)
}