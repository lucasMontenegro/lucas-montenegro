import globals from "lib/utils/globals"
import { useAuth0 } from "lib/react/auth0"
import superagent from "superagent"
const tokenOptions = {
  audience: process.env.REACT_APP_PROFILES_AUDIENCE,
  scope: `create_mine:profiles read_mine:profiles update_mine:profiles delete_mine:profiles`,
}
const host = globals.window.location.origin
export default function useProfiles () {
  const auth0 = useAuth0()
  async function getToken () {
    return [`Authorization`, `Bearer ${await auth0.getTokenSilently(tokenOptions)}`]
  }
  return {
    async createMine (username) {
      const token = await getToken()
      const res = await superagent
        .post(`${host}/api/profiles`)
        .set(...token)
        .send({ username, mine: true })
      return res.body
    },
    async readMine () {
      const token = await getToken()
      const res = await superagent.get(`${host}/api/profiles/mine`).set(...token)
      return res.body
    },
    async updateMine (values) {
      const token = await getToken()
      const res = await superagent.patch(`${host}/api/profiles/mine`).set(...token).send(values)
      return res.body
    },
    async deleteMine () {
      const token = await getToken()
      const res = await superagent.delete(`${host}/api/profiles/mine`).set(...token)
      return res.body
    },
    async readPublic (username) {
      const token = await getToken()
      const res = await superagent.get(`${host}/api/profiles/@${username}`).set(...token)
      return res.body
    },
  }
}