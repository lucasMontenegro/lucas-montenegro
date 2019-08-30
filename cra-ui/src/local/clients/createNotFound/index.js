import createBaseClient from "local/core/createBaseClient"
import spyOnCreateNotFound from "./spyOnCreateNotFound"
export default spyOnCreateNotFound({ createBaseClient })
export { default as spyOnCreateNotFound } from "./spyOnCreateNotFound"