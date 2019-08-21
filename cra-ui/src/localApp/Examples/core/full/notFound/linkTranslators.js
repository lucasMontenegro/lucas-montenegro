import makeTranslations from "local/makeTranslations"
export default makeTranslations({
  en: {
    toIntl() {
      return null
    },
    toLocal() {
      return { pathname: `/examples/core/full/en/notFound` }
    },
  },
  es: {
    toIntl() {
      return null
    },
    toLocal() {
      return { pathname: `/examples/core/full/es/notFound` }
    },
  },
})