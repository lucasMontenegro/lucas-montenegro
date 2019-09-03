import describeLinkTranslators from "local/core/specDescribers/describeLinkTranslators"
import makeTranslations from "local/makeTranslations"
import linkTranslators from "./linkTranslators"
import routing from "../routing"
describe(`app/App/home/linkTranslators`, () => {
  describeLinkTranslators({
    clientName: `home`,
    linkTranslators,
    routing,
    locations: makeTranslations({
      en: [
        { pathname: `/english/home` },
        { pathname: `/english/home/` },
      ],
      es: [
        { pathname: `/español/inicio` },
        { pathname: `/español/inicio/` },
      ],
    }),
  })
})