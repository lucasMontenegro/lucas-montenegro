import describeLinkTranslators from "local/core/specDescribers/describeLinkTranslators"
import makeTranslations from "local/makeTranslations"
import translators from "./linkTranslators"
import routing from "../routing"
describe(`localApp/Example/core/full/home/linkTranslators`, () => {
  describeLinkTranslators({
    appName: `home`,
    translators,
    routing,
    locations: makeTranslations({
      en: [
        { pathname: `/examples/core/full/en/home` },
        { pathname: `/examples/core/full/en/home/` },
      ],
      es: [
        { pathname: `/examples/core/full/es/home` },
        { pathname: `/examples/core/full/es/home/` },
      ],
    }),
  })
})