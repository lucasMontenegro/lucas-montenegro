import createConfig from "./createConfig"
import home from "./home"
import counter from "./counter"
import notFound from "./notFound"

export default createConfig({
  defaultLanguage: `en`,
  languages: {
    en: {
      name: `english`,
      displayName: `English`,
    },
    es: {
      name: `español`,
      displayName: `Español`,
    },
  },
  apps: {
    home,
    notFound,
    other: [counter],
  },
})
