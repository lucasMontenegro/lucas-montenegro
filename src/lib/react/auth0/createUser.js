export default async function createUser (client) {
  if (await client.isAuthenticated()) {
    return await client.getUser()
  }
  return null
}