import describeInitialLocation from "local/core/specDescribers/describeInitialLocation"
import translators from "./linkTranslators"
import routing from "../routing"
import location from "./initialLocation"
describe(`localApp/Example/core/full/notFound/initialLocation`, () => {
  describeInitialLocation({
    appName: `notFound`,
    translators,
    routing,
    location,
  })
})