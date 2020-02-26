export default function makeLogoutFunction (user, client, getLogoutUrl) {
  if (user === null || client === null) {
    return function logout () {}
  }
  return function logout () {
    client.logout({ returnTo: getLogoutUrl() })
  }
}