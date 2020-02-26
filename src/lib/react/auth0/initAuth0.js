import createAuth0Client from "@auth0/auth0-spa-js"
export default async function initAuth0 (setClient, setUser) {
  const client = await createAuth0Client({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  })
  setClient(client)
  return await client.isAuthenticated() ? setUser(await client.getUser()) : setUser(null)
}