import minifySql from "lib/utils/postgres/minifySql"
import router from "../router"
import { body as validateBody } from "express-validator"
import validateUsername from "./validateUsername"
import auth from "./auth"
import jwtAuthz from "express-jwt-authz"
import syncRequestHandler from "lib/utils/syncRequestHandler"
import { db, pgp } from "lib/node/postgres"
const template = minifySql(`
  INSERT INTO profiles (login_id, username)
  VALUES ($1, $2)
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
router.post(`/`, [
  validateBody(`login_id`)
    .isString().withMessage(`"body.login_id" should be a string`)
    .isLength({ min: 1 }).withMessage(`"body.login_id" should be at least 1 character long`),
  validateBody(`mine`).isBoolean().withMessage(`"body.mine" should be boolean`),
  validateUsername.body.exists().withMessage(`"body.username" is required`),
  auth,
  jwtAuthz([`create:profiles`, `create_mine:profiles`]),
  syncRequestHandler(async function createProfile (req, res) {
    const { body, user } = req
    let login_id
    if (body.mine) {
      if (user.permissions.findIndex(p => p === `create_mine:profiles`) === -1) {
        return res.status(403).send(`you can't create your profile`)
      }
      login_id = user.sub
    } else {
      ;({ login_id } = body)
      if (!login_id) {
        return res.status(400).send(`"body.login_id" is required`)
      }
      if (user.permissions.findIndex(p => p === `create:profiles`) === -1) {
        return res.status(403).send(`you can't create a profile`)
      }
    }
    let result
    try {
      result = await db.one(template, [login_id, body.username])
    } catch (err) {
      if (typeof err === `object` && err.code == `23505` && err.table == `profiles`) {
        switch (err.constraint) {
          case `profiles_login_id_key`:
          return res.status(400).send(`profile already exists`)
          case `profiles_pkey`:
          return res.status(400).send(`"body.username" should be unique`)
          default:
          break
        }
      }
      throw err
    }
    return res.json(result)
  }),
])