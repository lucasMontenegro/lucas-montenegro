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
          let sanitizedPath
          const filenameDotJs = path.resolve(basePath, `${depName}.js`)
          if (fs.existsSync(filenameDotJs)) {
            sanitizedPath = filenameDotJs
          } else {
            const indexDotJs = path.resolve(basePath, depName, `index.js`)
            if (fs.existsSync(indexDotJs)) {
              sanitizedPath = indexDotJs
            } else {
              throw Error(`Dependency not found`)
            }
          }
          const contents = fs.readFileSync(sanitizedPath, { encoding: `utf8` })
          expect(SHA256(contents).toString()).toMatchSnapshot()
        })
      })
    })
  }
}