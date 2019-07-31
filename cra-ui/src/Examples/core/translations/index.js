export default {
  en: {
    toIntl({ pathname }) {
      return { foo: /^.{44}([^/]+)\/?$/.exec(pathname)[1] }
    },
    toLocal({ foo }) {
      return { pathname: `/examples/core/routingMountPoint/en/example/${foo}` }
    },
  },
  es: {
    toIntl({ pathname }) {
      return { foo: /^.{44}([^/]+)\/?$/.exec(pathname)[1] }
    },
    toLocal({ foo }) {
      return { pathname: `/examples/core/routingMountPoint/es/example/${foo}` }
    },
  },
}