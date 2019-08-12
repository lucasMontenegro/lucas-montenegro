import describeRouting from "local/core/tests/describeRouting"
import routing from "./index"
describe(`src/Examples/core/routing/index.js`, () => {
  describeRouting({
    languageCodes: [`en`, `es`],
    routing,
    appNames: [`example`],
    exampleLocations: {
      root: [
        { pathname: `/examples/core/router` },
        { pathname: `/examples/core/router/` },
      ],
      main: {
        home: {
          en: [
            { pathname: `/examples/core/router/en/home` },
            { pathname: `/examples/core/router/en/home/` },
          ],
          es: [
            { pathname: `/examples/core/router/es/home` },
            { pathname: `/examples/core/router/es/home/` },
          ],
        },
        example: {
          en: [
            { pathname: `/examples/core/router/en/example/43` },
            { pathname: `/examples/core/router/en/example/12/` },
          ],
          es: [
            { pathname: `/examples/core/router/es/example/35` },
            { pathname: `/examples/core/router/es/example/67/` },
          ],
        },
        notFound: {
          en: [
            { pathname: `/examples/core/router/en/notFound` },
            { pathname: `/examples/core/router/en/notFound/` },
          ],
          es: [
            { pathname: `/examples/core/router/es/notFound` },
            { pathname: `/examples/core/router/es/notFound/` },
          ],
        },
      },
      languageRoutes: {
        root: {
          en: [
            { pathname: `/examples/core/router/en` },
            { pathname: `/examples/core/router/en/` },
          ],
          es: [
            { pathname: `/examples/core/router/es` },
            { pathname: `/examples/core/router/es/` },
          ],
        },
        notFound: {
          en: [
            { pathname: `/examples/core/router/en/404` },
          ],
          es: [
            { pathname: `/examples/core/router/es/404` },
          ],
        },
      },
    },
  })
})