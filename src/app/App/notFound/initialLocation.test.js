import describeInitialLocation from "local/core/specDescribers/describeInitialLocation"
import linkTranslators from "./linkTranslators"
import routing from "../routing"
import location from "./initialLocation"
describe(`app/App/notFound/initialLocation`, () => {
  describeInitialLocation({
    clientName: `notFound`,
    linkTranslators,
    routing,
    location,
  })
})