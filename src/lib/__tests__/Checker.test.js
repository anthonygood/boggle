import Checker from "../Checker.js"

describe("Checker", () => {
  it("returns true for words in dictionary", () => {
    expect(Checker.check("test")).toBe(true)
  })

  it("returns false for words not in dictionary", () => {
    expect(Checker.check("testx")).toBe(false)
  })
})
