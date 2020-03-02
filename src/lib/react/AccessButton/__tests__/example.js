describe(`../example`, () => {
  jestUtils.describeDependencies({
    deps: [
      `react`,
      `lib/react/auth0`,
      `@material-ui/core`,
      `../index.js`,
      `lib/languageDetector`,
      `lib/react/DarkMode`,
      `lib/react/Theme`,
      `lib/react/CssBaseline`,
      `react-router-dom`,
    ],
    relativeBasePath: __dirname,
  })
})