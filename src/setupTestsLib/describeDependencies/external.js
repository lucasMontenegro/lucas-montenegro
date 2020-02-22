import packageJson from "../../../package.json"
const { dependencies, devDependencies } = packageJson
export default function describeExternalDependencies (options) {
  const cases = options.deps.filter(d => !/^(lib\/|\.)/.test(d)).map(d => [d])
  if (cases.length > 0) {
    describe(`external dependencies`, () => {
      describe.each(cases)(`%s`, name => {
        it(`should match the installed version`, () => {
          expect(dependencies[name] || devDependencies[name]).toMatchSnapshot()
        })
      })
    })
  }
}