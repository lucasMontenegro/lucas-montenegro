import describeLinkTranslators from "local/core/specDescribers/describeLinkTranslators"
import makeTranslations from "local/makeTranslations"
import linkTranslators from "./linkTranslators"
import routing from "../routing"
describe(`app/Example/core/integrated/notFound/linkTranslators`, () => {
  describeLinkTranslators({
    clientName: `notFound`,
    linkTranslators,
    routing,
    locations: makeTranslations({
      en: [
        { pathname: `/examples/core/integrated/en/notFound` },
        { pathname: `/examples/core/integrated/en/notFound/` },
      ],
      es: [
        { pathname: `/examples/core/integrated/es/notFound` },
        { pathname: `/examples/core/integrated/es/notFound/` },
      ],
    }),
  })
})