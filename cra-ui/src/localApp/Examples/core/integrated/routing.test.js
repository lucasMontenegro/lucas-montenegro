import describeRouting from "local/core/specDescribers/describeRouting"
import routing from "./routing"
describe(`localApp/Examples/core/integrated/routing`, () => {
  describeRouting({
    languageCodes: [`en`, `es`],
    routing,
    clientNames: [`example`],
    exampleLocations: {
      root: [
        { pathname: `/examples/core/integrated` },
        { pathname: `/examples/core/integrated/` },
      ],
      main: {
        home: {
          en: [
            { pathname: `/examples/core/integrated/en/home` },
            { pathname: `/examples/core/integrated/en/home/` },
          ],
          es: [
            { pathname: `/examples/core/integrated/es/home` },
            { pathname: `/examples/core/integrated/es/home/` },
          ],
        },
        example: {
          en: [
            { pathname: `/examples/core/integrated/en/example/43` },
            { pathname: `/examples/core/integrated/en/example/12/` },
          ],
          es: [
            { pathname: `/examples/core/integrated/es/example/35` },
            { pathname: `/examples/core/integrated/es/example/67/` },
          ],
        },
        notFound: {
          en: [
            { pathname: `/examples/core/integrated/en/notFound` },
            { pathname: `/examples/core/integrated/en/notFound/` },
          ],
          es: [
            { pathname: `/examples/core/integrated/es/notFound` },
            { pathname: `/examples/core/integrated/es/notFound/` },
          ],
        },
      },
      languageRoutes: {
        root: {
          en: [
            { pathname: `/examples/core/integrated/en` },
            { pathname: `/examples/core/integrated/en/` },
          ],
          es: [
            { pathname: `/examples/core/integrated/es` },
            { pathname: `/examples/core/integrated/es/` },
          ],
        },
        notFound: {
          en: [
            { pathname: `/examples/core/integrated/en/404` },
          ],
          es: [
            { pathname: `/examples/core/integrated/es/404` },
          ],
        },
      },
    },
  })
})