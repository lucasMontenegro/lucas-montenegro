import { body, param } from "express-validator"
export default {
  body: body(`username`)
    .isString().withMessage(`"body.username" should be a string`)
    .isLength({ min: 1 }).withMessage(`"body.username" should be at least 1 character long`)
    .isLength({ max: 36 }).withMessage(`"body.username" should be 36 characters long maximum`)
    .matches(/@/).withMessage(`"body.username" shouldn't have "@" signs`)
    .matches(/\s/).withMessage(`"body.username" shouldn't have spaces`),
  param: [
    param(`username`)
      .matches(/(^@|^mine$)/)
      .withMessage(`"params.username" should either start with an "@" sign or be equal to "mine"`),
    param(`username`)
      .if(value => value.slice(0, 1) === `@`)
      .isLength({ min: 2 }).withMessage(`"params.username" should be at least 2 characters long`)
      .isLength({ max: 37 }).withMessage(`"params.username" should be at most 37 characters long`)
      .matches(/^.+@/).withMessage(`"params.username" should only have one "@" sign`)
      .matches(/\s/).withMessage(`"params.username" shouldn't have spaces`),
  ],
}