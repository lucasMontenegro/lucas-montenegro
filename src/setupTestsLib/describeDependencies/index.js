import external from "./external"
import local from "./local"
export default function describeDependencies (options) {
  external(options)
  local(options)
}