import loginPopupId from "../loginPopupId"
describe(`../loginPopupId`, () => {
  describe(`loginPopupId.count`, () => {
    it(`should start in 0`, () => {
      expect(loginPopupId).toHaveProperty(`count`, 0)
    })
  })
  describe(`loginPopupId.get() (first time)`, () => {
    it(`should increase the counter and return 1`, () => {
      expect(loginPopupId.get()).toBe(1)
      expect(loginPopupId.count).toBe(1)
    })
  })
  describe(`loginPopupId.get() (second time)`, () => {
    it(`should increase the counter and return 2`, () => {
      expect(loginPopupId.get()).toBe(2)
      expect(loginPopupId.count).toBe(2)
    })
  })
  describe(`loginPopupId.check(1)`, () => {
    it(`should return true`, () => {
      expect(loginPopupId.check(1)).toBe(true)
    })
  })
  describe(`loginPopupId.check(2)`, () => {
    it(`should return false`, () => {
      expect(loginPopupId.check(2)).toBe(false)
    })
  })
})