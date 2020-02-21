export default function makeLogoutFunction (ready, authenticated, client) {
  if (ready && authenticated) {
    return function logout () {
      client.logout()
    }
  }
  return function logout () {}
}