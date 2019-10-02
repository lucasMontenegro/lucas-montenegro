import makeTranslations from "local/makeTranslations"
export default makeTranslations({
  en: {
    toIntl({ state }) {
      return state
    },
    toLocal(state) {
      return { pathname: `/english/not-found`, state }
    },
  },
  es: {
    toIntl({ state }) {
      return state
    },
    toLocal(state) {
      return { pathname: `/español/no-encontrado`, state }
    },
  },
})