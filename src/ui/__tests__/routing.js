import supportedLanguages from "languages/supported"
import describeRouting from "lib/routing/describer"
import routing from "ui/routing"
describe(`ui/routing`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react-router-dom`])).toMatchSnapshot()
  })
  describeRouting({
    routing,
    exampleLocations: {
      root: [
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
      unknownClient: {
        en: [
          { pathname: `/english/404` },
        ],
        es: [
          { pathname: `/español/404` },
        ],
      },
    },
  })
})