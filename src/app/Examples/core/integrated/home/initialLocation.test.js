import describeInitialLocation from "local/core/specDescribers/describeInitialLocation"
import linkTranslators from "./linkTranslators"
import routing from "../routing"
import location from "./initialLocation"
describe(`app/Example/core/integrated/home/initialLocation`, () => {
  describeInitialLocation({
    clientName: `home`,
    linkTranslators,
    routing,
    location,
  })
})