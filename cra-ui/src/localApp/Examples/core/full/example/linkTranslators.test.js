import describeLinkTranslators from "local/core/specDescribers/describeLinkTranslators"
import makeTranslations from "local/makeTranslations"
import translators from "./linkTranslators"
import routing from "../routing"
describe(`localApp/Example/core/full/example/linkTranslators`, () => {
  describeLinkTranslators({
    appName: `example`,
    translators,
    routing,
    locations: makeTranslations({
      en: [
        { pathname: `/examples/core/full/en/example/25` },
        { pathname: `/examples/core/full/en/example/57/` },
      ],
      es: [
        { pathname: `/examples/core/full/es/example/12577` },
        { pathname: `/examples/core/full/es/example/4/` },
      ],
    }),
  })
})