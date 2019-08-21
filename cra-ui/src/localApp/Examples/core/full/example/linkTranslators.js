import makeTranslations from "local/makeTranslations"
export default makeTranslations({
  en: {
    toIntl({ pathname }) {
      return { foo: /^.{31}([^/]+)\/?$/.exec(pathname)[1] }
    },
    toLocal({ foo }) {
      return { pathname: `/examples/core/full/en/example/${foo}` }
    },
  },
  es: {
    toIntl({ pathname }) {
      return { foo: /^.{31}([^/]+)\/?$/.exec(pathname)[1] }
    },
    toLocal({ foo }) {
      return { pathname: `/examples/core/full/es/example/${foo}` }
    },
  },
})