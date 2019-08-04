import describeLinkTranslations from "local/core/tests/describeLinkTranslations"
import translations from "./index"
import routing from "../routing"
describe(`src/Example/core/translations/index.js`, () => {
  describeLinkTranslations({
    appName: `example`,
    translations,
    routing,
    locations: {
      en: [
        { pathname: `/examples/core/router/en/example/25` },
        { pathname: `/examples/core/router/en/example/57/` },
      ],
      es: [
        { pathname: `/examples/core/router/es/example/12577` },
        { pathname: `/examples/core/router/es/example/4/` },
      ],
    },
  })
})