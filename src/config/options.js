import home from "../home"
import counter from "../counter"
import notFound from "../notFound"

export default {
  defaultLanguage: `en`,
  languages: {
    en: {
      displayName: `English`,
    },
    es: {
      displayName: `Español`,
    },
  },
  apps: {
    home,
    counter,
    notFound,
  },
}
