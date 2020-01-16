import makeTranslations from "local/makeTranslations"
export default makeTranslations({
  en: {
    toIntl({ pathname }) {
      return { foo: /^.{37}([^/]+)\/?$/.exec(pathname)[1] }
    },
    toLocal({ foo }) {
      return { pathname: `/examples/core/integrated/en/example/${foo}` }
    },
  },
  es: {
    toIntl({ pathname }) {
      return { foo: /^.{37}([^/]+)\/?$/.exec(pathname)[1] }
    },
    toLocal({ foo }) {
      return { pathname: `/examples/core/integrated/es/example/${foo}` }
    },
  },
})