import minifySql from "lib/utils/postgres/minifySql"
import { pgp, db } from "lib/node/postgres"
import { body as validateBody } from "express-validator"
import router from "../router"
import validateUsername from "./validateUsername"
import auth from "./auth"
import jwtAuthz from "express-jwt-authz"
import syncRequestHandler from "lib/utils/syncRequestHandler"
const template = minifySql(`
  $1:raw -- dynamically created update
  WHERE $2:raw
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
const columnSet = new pgp.helpers.ColumnSet((
  [
    `username`,
    `name`,
    `surname`,
    `birthdate`,
    `birthplace`,
    `place_of_residence`,
    `occupation`,
    `education`,
    `sex`,
    `marital_status`,
  ].map(name => ({ name, skip: c => !c.exists }))
), { table: `profiles` })
const selectLoginId = minifySql(`SELECT login_id FROM profiles WHERE username = $1`)
function validateString (key, n) {
  return validateBody(key)
    .isString().withMessage(`"${key}" should be a string`)
    .isLength({ max: n }).withMessage(`"${key}" should be at most ${n} characters long`)
}
router.patch(`/:username`, [
  validateUsername.param,
  validateUsername.body,
  validateString(`name`, 60),
  validateString(`surname`, 40),
  validateBody(`birthdate`).isRFC3339().withMessage(`"birthdate" should be a valid RFC 3339 date`),
  validateString(`birthplace`, 100),
  validateString(`place_of_residence`, 100),
  validateString(`occupation`, 200),
  validateString(`education`, 300),
  validateBody(`sex`).isIn([`male`, `female`]).withMessage(`"sex" can be male or female`),
  validateBody(`marital_status`).isIn([
    `single`,
    `complicated`,
    `dating`,
    `engaged`,
    `married`,
    `divorced`,
    `widowed`,
  ]).withMessage(
    `"marital_status" can be single, complicated, dating, engaged, married, divorced or widowed`
  ),
  auth,
  jwtAuthz([`update:profiles`, `update_mine:profiles`]),
  syncRequestHandler(async function updateProfile (req, res) {
    const { user } = req
    async function runUpdate (where, value) {
      let result
      try {
        result = await db.oneOrNone(template, [
          pgp.helpers.update(req.body, columnSet),
          pgp.as.format(where, value),
        ])
      } catch (err) {
        if (
            typeof err === `object`
            && err.code === `23505`
            && err.table === `profiles`
            && err.constraint === `profiles_pkey`
          ) {
          return res.status(400).send(`"body.username" should be unique`)
        }
        throw err
      }
      if (result) {
        return res.json(result)
      }
      return res.status(404).send(`profile not found`)
    }
    async function updateMine (...args) {
      if (user.permissions.findIndex(p => p === `update_mine:profiles`) === -1) {
        return res.status(403).send(`you can't update your profile`)
      }
      return await runUpdate(...args)
    }
    let { username } = req.params
    if (username === `mine`) {
      return await updateMine(`login_id = $1`, user.sub)
    }
    username = username.slice(1)
    if (user.permissions.findIndex(p => p === `update:profiles`) > -1) {
      return await runUpdate(`username = $1`, username)
    }
    const found = await db.oneOrNone(selectLoginId, username)
    if (found) {
      if (found.login_id === user.sub) {
        return await updateMine(`username = $1`, username)
      }
      return res.status(403).send(`you can't update someone else's profile`)
    }
    return res.status(404).send(`profile not found`)
  }),
])