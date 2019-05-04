export default {
  español: {
    matchCode (code) {
      return /^es/.test(code)
    },
    text: `Ir a la versión en español`,
  },
  english: {
    matchCode (code) {
      return /^en/.test(code)
    },
    text: `Go to the English language website`,
  },
};
