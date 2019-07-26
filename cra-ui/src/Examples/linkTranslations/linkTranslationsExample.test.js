import translations from "./index"
import runLinkTranslationsTests from "local/runLinkTranslationsTests"
import routing from "../routing"
describe(`/Example/linkTranslations/index.js`, () => {
  runLinkTranslationsTests({
    appName: `example`,
    translations,
    routing,
    locations: {
      en: [
        { pathname: `/examples/router/en/example` },
        { pathname: `/examples/router/en/example/` },
      ],
      es: [
        { pathname: `/examples/router/es/example` },
        { pathname: `/examples/router/es/example/` },
      ],
    },
  })
})