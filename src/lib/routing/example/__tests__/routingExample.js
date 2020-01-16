import describeRouting from "lib/routing/describer"
import routingExample from "lib/routing/example/routingExample"
describe(`lib/routing/example/routingExample`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react-router-dom`])).toMatchSnapshot()
  })
  describeRouting({
    routing: routingExample,
    exampleLocations: {
      root: [
        { pathname: `/routing` },
        { pathname: `/routing/` },
      ],
      languageOnly: {
        en: [
          { pathname: `/routing/en` },
          { pathname: `/routing/en/` },
        ],
        es: [
          { pathname: `/routing/es` },
          { pathname: `/routing/es/` },
        ],
      },
      client: {
        home: {
          en: [
            { pathname: `/routing/en/home` },
            { pathname: `/routing/en/home/` },
          ],
          es: [
            { pathname: `/routing/es/home` },
            { pathname: `/routing/es/home/` },
          ],
        },
        foo: {
          en: [
            { pathname: `/routing/en/foo/2` },
            { pathname: `/routing/en/foo/2/` },
            { pathname: `/routing/en/foo/7` },
            { pathname: `/routing/en/foo/7/` },
          ],
          es: [
            { pathname: `/routing/es/foo/2` },
            { pathname: `/routing/es/foo/2/` },
            { pathname: `/routing/es/foo/7` },
            { pathname: `/routing/es/foo/7/` },
          ],
        },
        notFound: {
          en: [
            { pathname: `/routing/en/notFound` },
            { pathname: `/routing/en/notFound/` },
            { pathname: `/routing/en/notFound`, state: {} },
            { pathname: `/routing/en/notFound/`, state: {} },
          ],
          es: [
            { pathname: `/routing/es/notFound` },
            { pathname: `/routing/es/notFound/` },
            { pathname: `/routing/es/notFound`, state: {} },
            { pathname: `/routing/es/notFound/`, state: {} },
          ],
        },
      },
      unknownClient: {
        en: [
          { pathname: `/routing/en/404` },
        ],
        es: [
          { pathname: `/routing/es/404` },
        ],
      },
    },
  })
})