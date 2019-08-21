import describeLinkTranslators from "local/core/specDescribers/describeLinkTranslators"
import makeTranslations from "local/makeTranslations"
import translators from "./linkTranslators"
import routing from "../routing"
describe(`localApp/Example/core/full/notFound/linkTranslators`, () => {
  describeLinkTranslators({
    appName: `notFound`,
    translators,
    routing,
    locations: makeTranslations({
      en: [
        { pathname: `/examples/core/full/en/notFound` },
        { pathname: `/examples/core/full/en/notFound/` },
      ],
      es: [
        { pathname: `/examples/core/full/es/notFound` },
        { pathname: `/examples/core/full/es/notFound/` },
      ],
    }),
  })
})