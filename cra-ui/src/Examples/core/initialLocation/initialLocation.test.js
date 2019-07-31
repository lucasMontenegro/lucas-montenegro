import describeInitialLocation from "local/core/tests/describeInitialLocation"
import translations from "../translations"
import routing from "../routing"
import location from "./index"
describe(`src/Example/core/initialLocation/index.js`, () => {
  describeInitialLocation({
    appName: `example`,
    translations,
    routing,
    location,
  })
})