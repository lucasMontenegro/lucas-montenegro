import describeInitialLocation from "local/core/tests/describeInitialLocation"
import translators from "../linkTranslators"
import routing from "../routing"
import location from "./index"
describe(`src/Example/core/initialLocation/index.js`, () => {
  describeInitialLocation({
    appName: `example`,
    translators,
    routing,
    location,
  })
})