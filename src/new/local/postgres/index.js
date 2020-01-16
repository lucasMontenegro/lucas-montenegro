import startDb from "new/local/postgres/startDb"
export const { db, pgp, ignoreError } = startDb()
export function closeDb () {
  db.$config.pgp.end()
}