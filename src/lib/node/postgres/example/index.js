import { addIgnoredError, pgp, db, closeDb } from "../index.js"
import stringifyObject from "stringify-object"
import Bluebird from "bluebird"
addIgnoredError((err, e) => {
  const result = (
    typeof err === `object`
    && err.code == `23505`
    && err.table == `unique_constraint_example_table`
    && err.constraint == `unique_constraint_example_table_id_key`
    && err.detail == `Key (id)=(foo) already exists.`
  )
  if (result) {
    console.log(`\nFOO ERROR IGNORED\n`)
    console.log(`err:`)
    console.log(err)
    console.log(`e:`)
    console.log(e)
    console.log(`\n`)
  }
  return result
})
addIgnoredError((err, e) => {
  if (
      typeof err === `object`
      && err.code == `23505`
      && err.table == `unique_constraint_example_table`
      && err.constraint == `unique_constraint_example_table_id_key`
      && err.detail == `Key (id)=(bar) already exists.`
    ) {
    console.log(`\nBAR ERROR NOT IGNORED\n`)
  }
  return false
})
async function selectAll () {
  const query = `SELECT * FROM unique_constraint_example_table`
  const data = await db.any(query)
  console.log(`\n${query}:`)
  console.log(stringifyObject(data, { indent: `  ` }))
  console.log(`\n`)
}
async function example () {
  await selectAll()
  await Bluebird.all([`foo`, `bar`, `baz`].map(async id => {
    const query = pgp.as.format((
      `INSERT INTO unique_constraint_example_table (id) VALUES ($1)`
    ), id)
    try {
      console.log(`\n${query}\n`)
      await db.none(query)
      console.log(`\n${query}: DONE\n`)
    } catch (error) {
      console.log(`\n${query}: ERROR\n`)
      console.error(error)
      console.log(`\n`)
    }
    return
  }))
  await selectAll()
  {
    const query = `DELETE FROM unique_constraint_example_table WHERE id='baz'`
    await db.none(query)
    console.log(`\n${query}\n`)
  }
  await selectAll()
  closeDb()
}
example().catch(error => {
  console.error(`\nREJECTED PROMISE:`)
  console.error(error)
})