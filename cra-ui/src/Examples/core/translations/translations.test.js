import describeLinkTranslations from "local/core/tests/describeLinkTranslations"
import translations from "./index"
import routing from "../routing"
describe(`src/Example/core/translations/index.js`, () => {
  describeLinkTranslations({
    appName: `example`,
    translations,
    routing,
    locations: {
      en: [
        { pathname: `/examples/core/routingMountPoint/en/example/25` },
        { pathname: `/examples/core/routingMountPoint/en/example/57/` },
      ],
      es: [
        { pathname: `/examples/core/routingMountPoint/es/example/12577` },
        { pathname: `/examples/core/routingMountPoint/es/example/4/` },
      ],
    },
  })
})