import describeLinkTranslations from "local/core/tests/describeLinkTranslations"
import translators from "./index"
import routing from "../routing"
describe(`src/Example/core/linkTranslators`, () => {
  describeLinkTranslations({
    appName: `example`,
    translators,
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