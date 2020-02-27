describe(`../example`, () => {
  jestUtils.describeDependencies({
    deps: [
      `react`,
      `lib/react/auth0`,
      `../index.js`,
      `lib/languageDetector`,
      `lib/react/DarkMode`,
      `lib/react/Theme`,
      `lib/react/CssBaseline`,
      `@material-ui/core`,
      `react-router-dom`,
    ],
    relativeBasePath: __dirname,
  })
})