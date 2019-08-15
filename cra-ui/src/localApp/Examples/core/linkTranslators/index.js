import makeTranslations from "local/makeTranslations"
export default makeTranslations({
  en: {
    toIntl({ pathname }) {
      return { foo: /^.{33}([^/]+)\/?$/.exec(pathname)[1] }
    },
    toLocal({ foo }) {
      return { pathname: `/examples/core/router/en/example/${foo}` }
    },
  },
  es: {
    toIntl({ pathname }) {
      return { foo: /^.{33}([^/]+)\/?$/.exec(pathname)[1] }
    },
    toLocal({ foo }) {
      return { pathname: `/examples/core/router/es/example/${foo}` }
    },
  },
})