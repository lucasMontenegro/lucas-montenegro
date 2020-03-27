import createAuth0Client from "@auth0/auth0-spa-js"
import requiredEnv from "lib/utils/requiredWebpackEnv"
import createUser from "./createUser"
export default async function initAuth0 (setClient, setUser) {
  const client = await createAuth0Client({
    domain: requiredEnv(process.env.REACT_APP_AUTH0_DOMAIN),
    client_id: requiredEnv(process.env.REACT_APP_AUTH0_CLIENT_ID),
  })
  setClient(client)
  return setUser(await createUser(client))
}