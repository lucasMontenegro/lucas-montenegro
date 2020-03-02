import { useAuth0 } from "lib/react/auth0"
import useLogout from "./useLogout"
export default function useAccessButtonState (closeDashboard) {
  const auth0 = useAuth0()
  const logout = useLogout(auth0)
  return {
    loggedIn: Boolean(auth0.user),
    logout,
    login () {
      auth0.login()
      closeDashboard && closeDashboard()
    },
  }
}