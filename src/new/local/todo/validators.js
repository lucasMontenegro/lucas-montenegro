import { body, param } from "express-validator"
const description = body(`description`)
  .isString()
  .withMessage(`Invalid to-do item description`)
  .isLength({ min: 1 })
  .withMessage(`The to-do item description must be at least one character long`)
  .isLength({ max: 256 })
  .withMessage(`The to-do item description must be at most 256 characters long`)
const priority = body(`priority`)
  .isIn([`high`, `medium`, `low`])
  .withMessage(`The to-do item priority must be "high", "medium" or "low"`)
const todo_id = param(`todo_id`)
  .isNumeric({ no_symbols: true })
  .withMessage(`The to-do item ID must only contain numbers`)
const status = body(`status`)
  .isIn([`done`, `pending`])
  .withMessage(`The to-do item status must be "done" or "pending"`)
export default {
  post: [description, priority],
  put: [todo_id, priority, status],
  delete: todo_id,
}