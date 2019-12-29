import routingDescriber from "../describer"
import routingExample from "../routingExample"
jest.mock(`../extend`, () => ({ __esModule: true, default: x => x }))
describe(`../routingExample.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`react-router-dom`])).toMatchSnapshot()
  })
  routingDescriber({
    routing: routingExample,
    exampleLocations: {
      root: [
        { pathname: `/react/routing` },
        { pathname: `/react/routing/` },
      ],
      languageOnly: {
        en: [
          { pathname: `/react/routing/en` },
          { pathname: `/react/routing/en/` },
        ],
        es: [
          { pathname: `/react/routing/es` },
          { pathname: `/react/routing/es/` },
        ],
      },
      client: {
        home: {
          en: [
            { pathname: `/react/routing/en/home/4` },
            { pathname: `/react/routing/en/home/4/` },
            { pathname: `/react/routing/en/home/9` },
            { pathname: `/react/routing/en/home/9/` },
          ],
          es: [
            { pathname: `/react/routing/es/home/4` },
            { pathname: `/react/routing/es/home/4/` },
            { pathname: `/react/routing/es/home/9` },
            { pathname: `/react/routing/es/home/9/` },
          ],
        },
        foo: {
          en: [
            { pathname: `/react/routing/en/foo/2` },
            { pathname: `/react/routing/en/foo/2/` },
            { pathname: `/react/routing/en/foo/7` },
            { pathname: `/react/routing/en/foo/7/` },
          ],
          es: [
            { pathname: `/react/routing/es/foo/2` },
            { pathname: `/react/routing/es/foo/2/` },
            { pathname: `/react/routing/es/foo/7` },
            { pathname: `/react/routing/es/foo/7/` },
          ],
        },
        notFound: {
          en: [
            { pathname: `/react/routing/en/notFound` },
            { pathname: `/react/routing/en/notFound/` },
            { pathname: `/react/routing/en/notFound`, state: {} },
            { pathname: `/react/routing/en/notFound/`, state: {} },
          ],
          es: [
            { pathname: `/react/routing/es/notFound` },
            { pathname: `/react/routing/es/notFound/` },
            { pathname: `/react/routing/es/notFound`, state: {} },
            { pathname: `/react/routing/es/notFound/`, state: {} },
          ],
        },
      },
      unknownClient: {
        en: [
          { pathname: `/react/routing/en/404` },
        ],
        es: [
          { pathname: `/react/routing/es/404` },
        ],
      },
    },
  })
})