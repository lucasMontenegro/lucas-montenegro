const { error } = console
if (process.env.NODE_ENV !== `production`) {
  console.error = function logErrorOrThrow (warning) {
    const shouldThrow = (
      /(invalid|failed)/i.test(warning) &&
      /prop/i.test(warning) &&
      /type/i.test(warning)
    )
    if (shouldThrow) {
      throw new Error(warning)
    }
    error.apply(console, arguments)
  }
}