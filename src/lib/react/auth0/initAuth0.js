import createAuth0Client from "@auth0/auth0-spa-js"
import globals from "lib/utils/globals"
import history from "lib/browserHistory"
export default async function initAuth0 (redirectUri, setClient, setUser) {
  const client = await createAuth0Client({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirect_uri: redirectUri(globals.window.location.origin),
  })
  if (globals.window.location.search.includes(`code=`) &&
      globals.window.location.search.includes(`state=`)) {
    await client.handleRedirectCallback()
    history.push(globals.window.location.pathname)
  }
  setClient(client)
  return await client.isAuthenticated() ? setUser(await client.getUser()) : setUser(null)
}