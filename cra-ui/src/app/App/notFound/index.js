import createNotFound from "local/clients/createNotFound"
import initialLocation from "./initialLocation"
import linkTranslators from "./linkTranslators"
import routing from "../routing"
export default createNotFound({
  appName: `main`,
  initialLocation,
  linkTranslators,
  routing,
})