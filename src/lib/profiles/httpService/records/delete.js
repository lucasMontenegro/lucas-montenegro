import minifySql from "lib/utils/postgres/minifySql"
import router from "../router"
import validateUsername from "./validateUsername"
import auth from "./auth"
import jwtAuthz from "express-jwt-authz"
import syncRequestHandler from "lib/utils/syncRequestHandler"
import { db, pgp } from "lib/node/postgres"
const template = minifySql(`
  DELETE FROM profiles
  WHERE $1:raw
  RETURNING
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
`)
const selectLoginId = minifySql(`SELECT login_id FROM profiles WHERE username = $1`)
router.delete(`/:username`, [
  validateUsername.param,
  auth,
  jwtAuthz([`delete:profiles`, `delete_mine:profiles`]),
  syncRequestHandler(async function deleteProfile (req, res) {
    async function runDelete (where, value) {
      const result = await db.oneOrNone(template, pgp.as.format(where, value))
      if (result) {
        // remove pictures from cloudinary
        return res.json(result)
      }
      return res.status(404).send(`profile not found`)
    }
    const { user } = req
    async function deleteMine (...args) {
      if (user.permissions.findIndex(p => p === `delete_mine:profiles`) === -1) {
        return res.status(403).send(`you can't delete your own profile`)
      }
      return await runDelete(...args)
    }
    let { username } = req.params
    if (username === `mine`) {
      return await deleteMine(`login_id = $1`, user.sub)
    }
    username = username.slice(1)
    if (user.permissions.findIndex(p => p === `delete:profiles`) > -1) {
      return await runDelete(`username = $1`, username)
    }
    const found = await db.oneOrNone(selectLoginId, username)
    if (found) {
      if (found.login_id === user.sub) {
        return await deleteMine(`username = $1`, username)
      }
      return res.status(403).send(`you can't delete someone else's profile`)
    }
    return res.status(404).send(`profile not found`)
  }),
])