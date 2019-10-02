import describeRouting from "local/core/specDescribers/describeRouting"
import routing from "./index"
describe(`local/clients/createNotFound/NotFoundView/exampleRouting`, () => {
  describeRouting({
    routing,
    clientNames: [],
    exampleLocations: {
      root: [{ pathname: `` }],
      main: {
        home: {
          en: [{ pathname: `/en/home` }],
          es: [{ pathname: `/es/home` }],
        },
        notFound: {
          en: [{ pathname: `/en/notFound` }],
          es: [{ pathname: `/es/notFound` }],
        },
      },
      languageRoutes: {
        root: {
          en: [{ pathname: `/en` }],
          es: [{ pathname: `/es` }],
        },
        notFound: {
          en: [{ pathname: `/en/404` }],
          es: [{ pathname: `/es/404` }],
        },
      },
    },
  })
})