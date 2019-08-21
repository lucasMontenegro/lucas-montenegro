import describeInitialLocation from "local/core/specDescribers/describeInitialLocation"
import translators from "./linkTranslators"
import routing from "../routing"
import location from "./initialLocation"
describe(`localApp/Example/core/full/example/initialLocation`, () => {
  describeInitialLocation({
    appName: `example`,
    translators,
    routing,
    location,
  })
})