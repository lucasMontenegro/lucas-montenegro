describe(`./index.js`, () => {
  jestUtils.describeDependencies({
    deps: [
      `stringify-object`,
      `bluebird`,
    ],
    relativeBasePath: __dirname,
  })
})