import describeRouting from "local/core/specDescribers/describeRouting"
import routing from "./routing"
describe(`app/App/routing`, () => {
  describeRouting({
    routing,
    clientNames: [],
    exampleLocations: {
      root: [
        { pathname: `` },
        { pathname: `/` },
      ],
      main: {
        home: {
          en: [
            { pathname: `/english/home` },
            { pathname: `/english/home/` },
          ],
          es: [
            { pathname: `/español/inicio` },
            { pathname: `/español/inicio/` },
          ],
        },
        notFound: {
          en: [
            { pathname: `/english/not-found` },
            { pathname: `/english/not-found/` },
          ],
          es: [
            { pathname: `/español/no-encontrado` },
            { pathname: `/español/no-encontrado/` },
          ],
        },
      },
      languageRoutes: {
        root: {
          en: [
            { pathname: `/english` },
            { pathname: `/english/` },
          ],
          es: [
            { pathname: `/español` },
            { pathname: `/español/` },
          ],
        },
        notFound: {
          en: [
            { pathname: `/english/404` },
          ],
          es: [
            { pathname: `/español/404` },
          ],
        },
      },
    },
  })
})