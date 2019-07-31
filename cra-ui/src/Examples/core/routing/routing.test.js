import describeRouting from "local/core/tests/describeRouting"
import routing from "./index"
describe(`src/Examples/core/routing/index.js`, () => {
  describeRouting({
    languageCodes: [`en`, `es`],
    routing,
    appNames: [`example`],
    exampleLocations: {
      root: [
        { pathname: `/examples/core/routingMountPoint` },
        { pathname: `/examples/core/routingMountPoint/` },
      ],
      main: {
        home: {
          en: [
            { pathname: `/examples/core/routingMountPoint/en/home` },
            { pathname: `/examples/core/routingMountPoint/en/home/` },
          ],
          es: [
            { pathname: `/examples/core/routingMountPoint/es/home` },
            { pathname: `/examples/core/routingMountPoint/es/home/` },
          ],
        },
        example: {
          en: [
            { pathname: `/examples/core/routingMountPoint/en/example/43` },
            { pathname: `/examples/core/routingMountPoint/en/example/12/` },
          ],
          es: [
            { pathname: `/examples/core/routingMountPoint/es/example/35` },
            { pathname: `/examples/core/routingMountPoint/es/example/67/` },
          ],
        },
        notFound: {
          en: [
            { pathname: `/examples/core/routingMountPoint/en/notFound` },
            { pathname: `/examples/core/routingMountPoint/en/notFound/` },
          ],
          es: [
            { pathname: `/examples/core/routingMountPoint/es/notFound` },
            { pathname: `/examples/core/routingMountPoint/es/notFound/` },
          ],
        },
      },
      languageRoutes: {
        root: {
          en: [
            { pathname: `/examples/core/routingMountPoint/en` },
            { pathname: `/examples/core/routingMountPoint/en/` },
          ],
          es: [
            { pathname: `/examples/core/routingMountPoint/es` },
            { pathname: `/examples/core/routingMountPoint/es/` },
          ],
        },
        notFound: {
          en: [
            { pathname: `/examples/core/routingMountPoint/en/404` },
          ],
          es: [
            { pathname: `/examples/core/routingMountPoint/es/404` },
          ],
        },
      },
    },
  })
})