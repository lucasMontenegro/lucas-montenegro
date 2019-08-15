import describeLinkTranslators from "local/core/specDescribers/describeLinkTranslators"
import translators from "./index"
import routing from "../routing"
import makeTranslations from "local/makeTranslations"
describe(`src/Example/core/linkTranslators`, () => {
  describeLinkTranslators({
    appName: `example`,
    translators,
    routing,
    locations: makeTranslations({
      en: [
        { pathname: `/examples/core/router/en/example/25` },
        { pathname: `/examples/core/router/en/example/57/` },
      ],
      es: [
        { pathname: `/examples/core/router/es/example/12577` },
        { pathname: `/examples/core/router/es/example/4/` },
      ],
    }),
  })
})