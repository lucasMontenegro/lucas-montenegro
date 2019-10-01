const fs = require("fs")
const osVersionRegExp = new RegExp(`
-- Dumped from database version (\\d+\\.\\d+) \\([^)]*\\)
-- Dumped by pg_dump version (\\d+\\.\\d+) \\([^)]*\\)`, `m`)
function readFile (pathname) {
  const fn = (match, version) => `
-- Dumped from database version ${version}
-- Dumped by pg_dump version ${version}`
  return fs.readFileSync(pathname, { encoding: `utf8` })
    .replace(osVersionRegExp, fn) // hide the OS comment from the dump file
}
const devDump = readFile(`./dev-dump.private.sql`)
const prodDump = readFile(`./prod-dump.private.sql`)
describe(`Development Database`, () => {
  it(`should match the snapshot`, () => {
    expect(devDump).toMatchSnapshot()
  })
})
describe(`Production Database`, () => {
  it(`should match the develpment database`, () => {
    expect(prodDump).toBe(devDump)
  })
})