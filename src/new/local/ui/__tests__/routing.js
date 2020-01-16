import supportedLanguages from "new/local/supportedLanguages"
import describeRouting from "new/local/paperbase/describeRouting"
import describeNotFoundRouting from "new/local/notFound/describeRouting"
import routing from "new/local/ui/routing"
describe(`new/local/ui/routing`, () => {
  describeRouting({
    routing,
    languageCodes: supportedLanguages,
    clientNames: [],
    exampleLocations: {
      matchRoot: [
        { pathname: `` },
        { pathname: `/` },
      ],
      languageOnly: {
        en: [
          { pathname: `/english` },
          { pathname: `/english/` },
        ],
        es: [
          { pathname: `/español` },
          { pathname: `/español/` },
        ],
      },
      client: {
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
            { pathname: `/english/not-found`, state: {} },
            { pathname: `/english/not-found/`, state: {} },
          ],
          es: [
            { pathname: `/español/no-encontrado` },
            { pathname: `/español/no-encontrado/` },
            { pathname: `/español/no-encontrado`, state: {} },
            { pathname: `/español/no-encontrado/`, state: {} },
          ],
        },
      },
      clientNotFound: {
        en: [
          { pathname: `/english/404` },
        ],
        es: [
          { pathname: `/español/404` },
        ],
      },
    },
  })
  describeNotFoundRouting({
    routing,
    languageCodes: supportedLanguages,
    exampleLocations: {
      en: [
        { pathname: `/english/not-found`, state: {} },
        { pathname: `/english/not-found/`, state: {} },
      ],
      es: [
        { pathname: `/español/no-encontrado`, state: {} },
        { pathname: `/español/no-encontrado/`, state: {} },
      ],
    },
  })
})