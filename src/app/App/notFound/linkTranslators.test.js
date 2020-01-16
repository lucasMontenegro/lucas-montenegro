import describeLinkTranslators from "local/core/specDescribers/describeLinkTranslators"
import makeTranslations from "local/makeTranslations"
import linkTranslators from "./linkTranslators"
import routing from "../routing"
describe(`app/App/notFound/linkTranslators`, () => {
  describeLinkTranslators({
    clientName: `notFound`,
    linkTranslators,
    routing,
    locations: makeTranslations({
      en: [
        { pathname: `/english/not-found` },
        { pathname: `/english/not-found/` },
      ],
      es: [
        { pathname: `/español/no-encontrado` },
        { pathname: `/español/no-encontrado/` },
      ],
    }),
  })
})