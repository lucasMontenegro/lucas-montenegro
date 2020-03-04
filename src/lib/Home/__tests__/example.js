describe(`../example.js`, () => {
  jestUtils.describeDependencies({
    deps: [
      `react`,
      `lib/languageDetector`,
      `lib/react/DarkMode`,
      `lib/react/Theme`,
      `lib/react/CssBaseline`,
      `lib/react/auth0`,
      `lib/react/routing/context`,
      `lib/react/Dashboard`,
      `../index.js`,
      `react-router-dom`,
    ],
    relativeBasePath: __dirname,
  })
})