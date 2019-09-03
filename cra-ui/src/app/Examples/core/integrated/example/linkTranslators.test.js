import describeLinkTranslators from "local/core/specDescribers/describeLinkTranslators"
import makeTranslations from "local/makeTranslations"
import linkTranslators from "./linkTranslators"
import routing from "../routing"
describe(`app/Example/core/integrated/example/linkTranslators`, () => {
  describeLinkTranslators({
    clientName: `example`,
    linkTranslators,
    routing,
    locations: makeTranslations({
      en: [
        { pathname: `/examples/core/integrated/en/example/25` },
        { pathname: `/examples/core/integrated/en/example/57/` },
      ],
      es: [
        { pathname: `/examples/core/integrated/es/example/12577` },
        { pathname: `/examples/core/integrated/es/example/4/` },
      ],
    }),
  })
})