import describeLinkTranslators from "local/core/specDescribers/describeLinkTranslators"
import makeTranslations from "local/makeTranslations"
import linkTranslators from "./linkTranslators"
import routing from "../routing"
describe(`localApp/Example/core/integrated/home/linkTranslators`, () => {
  describeLinkTranslators({
    clientName: `home`,
    linkTranslators,
    routing,
    locations: makeTranslations({
      en: [
        { pathname: `/examples/core/integrated/en/home` },
        { pathname: `/examples/core/integrated/en/home/` },
      ],
      es: [
        { pathname: `/examples/core/integrated/es/home` },
        { pathname: `/examples/core/integrated/es/home/` },
      ],
    }),
  })
})