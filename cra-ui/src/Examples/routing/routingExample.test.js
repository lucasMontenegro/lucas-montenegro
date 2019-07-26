import runRoutingTests from "local/runRoutingTests"
import routing from "./index"
describe(`/Examples/routing/index.js`, () => {
  runRoutingTests({
    languageCodes: [`en`, `es`],
    routing,
    appNames: [`example`],
    exampleLocations: {
      root: [
        { pathname: `/examples/router` },
        { pathname: `/examples/router/` },
      ],
      main: {
        home: {
          en: [
            { pathname: `/examples/router/en/home` },
            { pathname: `/examples/router/en/home/` },
          ],
          es: [
            { pathname: `/examples/router/es/home` },
            { pathname: `/examples/router/es/home/` },
          ],
        },
        example: {
          en: [
            { pathname: `/examples/router/en/example` },
            { pathname: `/examples/router/en/example/` },
          ],
          es: [
            { pathname: `/examples/router/es/example` },
            { pathname: `/examples/router/es/example/` },
          ],
        },
        notFound: {
          en: [
            { pathname: `/examples/router/en/notFound` },
            { pathname: `/examples/router/en/notFound/` },
          ],
          es: [
            { pathname: `/examples/router/es/notFound` },
            { pathname: `/examples/router/es/notFound/` },
          ],
        },
      },
      languageRoutes: {
        root: {
          en: [
            { pathname: `/examples/router/en` },
            { pathname: `/examples/router/en/` },
          ],
          es: [
            { pathname: `/examples/router/es` },
            { pathname: `/examples/router/es/` },
          ],
        },
        notFound: {
          en: [
            { pathname: `/examples/router/en/404` },
          ],
          es: [
            { pathname: `/examples/router/es/404` },
          ],
        },
      },
    },
  })
})