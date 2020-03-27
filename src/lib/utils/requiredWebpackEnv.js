export default function requiredWebpackEnv (value) {
  // usage: requiredWebpackEnv(process.env.FOO)
  if (typeof value === `undefined`) {
    throw Error(`An environment variable is required`)
  }
  return value
}