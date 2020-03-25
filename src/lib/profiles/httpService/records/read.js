import minifySql from "lib/utils/postgres/minifySql"
import router from "../router"
import validateUsername from "./validateUsername"
import auth from "./auth"
import syncRequestHandler from "lib/utils/syncRequestHandler"
import { db, pgp } from "lib/node/postgres"
const template = minifySql(`
  SELECT
    username,
    login_id,
    created_on,
    name,
    surname,
    picture,
    cover_picture_small,
    cover_picture_medium,
    cover_picture_big,
    birthdate,
    birthplace,
    place_of_residence,
    occupation,
    education,
    sex,
    marital_status
  FROM profiles
  WHERE $1:raw
`)
router.get(`/:username`, [
  validateUsername.param,
  auth,
  syncRequestHandler(async function readProfile (req, res) {
    const { user } = req
    async function runSelect (where, value) {
      const result = await db.oneOrNone(template, pgp.as.format(where, value))
      if (result) {
        if (
            result.login_id !== user.sub
            && user.permissions.findIndex(p => p === `read_private:profiles`) === -1
          ) { // hide private data
          delete result.login_id
        }
        return res.json(result)
      }
      return res.status(404).send(`profile not found`)
    }
    let { username } = req.params
    if (username === `mine`) {
      if (user.permissions.findIndex(p => p === `read_mine:profiles`) === -1) {
        return res.status(403).send(`you can't read your profile`)
      }
      return await runSelect(`login_id = $1`, user.sub)
    }
    return await runSelect(`username = $1`, username.slice(1))
  }),
])