import makeTranslations from "local/makeTranslations"
export default makeTranslations({
  en: {
    toIntl() {
      return null
    },
    toLocal() {
      return { pathname: `/english/home` }
    },
  },
  es: {
    toIntl() {
      return null
    },
    toLocal() {
      return { pathname: `/español/inicio` }
    },
  },
})