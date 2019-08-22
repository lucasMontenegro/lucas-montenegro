import makeTranslations from "local/makeTranslations"
export default makeTranslations({
  en: {
    toIntl() {
      return null
    },
    toLocal() {
      return { pathname: `/examples/core/integrated/en/home` }
    },
  },
  es: {
    toIntl() {
      return null
    },
    toLocal() {
      return { pathname: `/examples/core/integrated/es/home` }
    },
  },
})