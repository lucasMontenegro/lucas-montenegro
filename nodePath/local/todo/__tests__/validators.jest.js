jest.mock(`express-validator`, () => ({ body: jest.fn(), param: jest.fn() }))
const messages = {}
function makeValidatorMock (source) {
  return field => {
    const validator = [source, field]
    const obj = {
      toJSON () {
        return validator
      },
      withMessage (str) {
        validator.push(str in messages ? `with repeated message` : `with unique message`)
        messages[str] = null
        return obj
      },
      isString () {
        validator.push(`isString`)
        return obj
      },
      isLength (opts) {
        validator.push([`isLength`, opts])
        return obj
      },
      isIn (opts) {
        validator.push([`isIn`, opts])
        return obj
      },
      isNumeric (opts) {
        validator.push([`isNumeric`, opts])
        return obj
      },
    }
    return obj
  }
}
const { body, param } = require("express-validator")
param.mockImplementation(makeValidatorMock(`param`))
body.mockImplementation(makeValidatorMock(`body`))
const validators = require("local/todo/validators")
describe(`local/todo/validators`, () => {
  it(`should create the validators`, () => {
    expect(validators.post.map(obj => obj.toJSON())).toEqual([
      [
        `body`,
        `description`,
        `isString`,
        `with unique message`,
        [`isLength`, { min: 1 }],
        `with unique message`,
        [`isLength`, { max: 256 }],
        `with unique message`,
      ],
      [
        `body`,
        `priority`,
        [`isIn`, [`high`, `medium`, `low`]],
        `with unique message`,
      ],
    ])
    expect(validators.get).toEqual(null)
    expect(validators.update.map(obj => obj.toJSON())).toEqual([
      [
        `param`,
        `todo_id`,
        [`isNumeric`, { no_symbols: true }],
        `with unique message`,
      ],
      [
        `body`,
        `priority`,
        [`isIn`, [`high`, `medium`, `low`]],
        `with unique message`,
      ],
      [
        `body`,
        `status`,
        [`isIn`, [`done`, `pending`]],
        `with unique message`,
      ],
    ])
    expect(validators.delete.toJSON()).toEqual([
      `param`,
      `todo_id`,
      [`isNumeric`, { no_symbols: true }],
      `with unique message`,
    ])
  })
})