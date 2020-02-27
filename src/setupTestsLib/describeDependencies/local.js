import path from "path"
import fs from "fs"
import SHA256 from "crypto-js/sha256"
const srcPath = path.resolve(__dirname, `../../`)
export default function describeLocalDependencies (options) {
  const cases = options.deps.reduce((cases, name) => {
    if (/^\./.test(name)) {
      cases.push([name, false])
    } else if (/^lib\//.test(name)) {
      cases.push([name, true])
    }
    return cases
  }, [])
  if (cases.length > 0) {
    describe(`local dependencies`, () => {
      describe.each(cases)(`%s`, (depName, isAbsolute) => {
        it(`should match the saved hash`, () => {
          const basePath = isAbsolute ? srcPath : options.relativeBasePath
          const filenameMakers = [
            () => path.resolve(basePath, depName),
            () => path.resolve(basePath, `${depName}.js`),
            () => path.resolve(basePath, depName, `index.js`),
          ]
          let contents
          const errorCodes = {
            "EISDIR": null,
            "ENOENT": null,
          }
          for (const makeFilename of filenameMakers) {
            try {
              contents = fs.readFileSync(makeFilename(), { encoding: `utf8` })
              break
            } catch (e) {
              if (!(e.code in errorCodes)) {
                throw e
              }
            }
          }
          if (!contents) {
            throw Error(`describeLocalDependencies: couldn't find ${depName}`)
          }
          expect(SHA256(contents).toString()).toMatchSnapshot()
        })
      })
    })
  }
}