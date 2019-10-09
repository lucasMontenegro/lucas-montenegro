import minifySql from "new/local/utils/minifySql"
describe(`new/local/utils/minifySql`, () => {
  it(`should minify SQL queries`, () => {
    expect(minifySql(`
      SELECT * FROM my_table
      WHERE foo = $1
      LIMIT 20
    `)).toMatchSnapshot()
  })
})