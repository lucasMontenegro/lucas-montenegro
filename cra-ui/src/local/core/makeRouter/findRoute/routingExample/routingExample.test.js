import describeRouting from "local/core/specDescribers/describeRouting"
import routing from "./index"
describe(`local/core/makeRouter/findRoute/routingExample`, () => {
  describeRouting({
    routing,
    languageCodes: [`en`, `es`],
    clientNames: [`example`],
    exampleLocations: {
      root: [{ pathname: `` }],
      main: {
        home: {
          en: [{ pathname: `/en/home` }],
          es: [{ pathname: `/es/home` }],
        },
        example: {
          en: [{ pathname: `/en/example/43` }],
          es: [{ pathname: `/es/example/35` }],
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