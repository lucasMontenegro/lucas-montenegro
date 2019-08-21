import describeRouting from "local/core/specDescribers/describeRouting"
import routing from "./routing"
describe(`localApp/Examples/core/full/routing`, () => {
  describeRouting({
    languageCodes: [`en`, `es`],
    routing,
    appNames: [`example`],
    exampleLocations: {
      root: [
        { pathname: `/examples/core/full` },
        { pathname: `/examples/core/full/` },
      ],
      main: {
        home: {
          en: [
            { pathname: `/examples/core/full/en/home` },
            { pathname: `/examples/core/full/en/home/` },
          ],
          es: [
            { pathname: `/examples/core/full/es/home` },
            { pathname: `/examples/core/full/es/home/` },
          ],
        },
        example: {
          en: [
            { pathname: `/examples/core/full/en/example/43` },
            { pathname: `/examples/core/full/en/example/12/` },
          ],
          es: [
            { pathname: `/examples/core/full/es/example/35` },
            { pathname: `/examples/core/full/es/example/67/` },
          ],
        },
        notFound: {
          en: [
            { pathname: `/examples/core/full/en/notFound` },
            { pathname: `/examples/core/full/en/notFound/` },
          ],
          es: [
            { pathname: `/examples/core/full/es/notFound` },
            { pathname: `/examples/core/full/es/notFound/` },
          ],
        },
      },
      languageRoutes: {
        root: {
          en: [
            { pathname: `/examples/core/full/en` },
            { pathname: `/examples/core/full/en/` },
          ],
          es: [
            { pathname: `/examples/core/full/es` },
            { pathname: `/examples/core/full/es/` },
          ],
        },
        notFound: {
          en: [
            { pathname: `/examples/core/full/en/404` },
          ],
          es: [
            { pathname: `/examples/core/full/es/404` },
          ],
        },
      },
    },
  })
})