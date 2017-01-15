import Letter from "../Letter.js"

describe("Letter", () => {
  let letter = new Letter("A")

  it("can return a string representation of itself", () => {
    expect(letter.toString()).toBe("A")
  })

  it("always returns uppercase letter", () => {
    const lowerCaseB = new Letter("b")

    expect(lowerCaseB.toString()).toBe("B")
  })

  it("converts Q to Qu", () => {
    const q = new Letter("q")

    expect(q.toString()).toBe("Qu")
  })

  it("can return a JSON representation of itself", () => {
    expect(letter.toJSON()).toEqual({
      letter:     "A",
      baseValue:   1,
      multiplier:  1,
      value:       1,
      x:           0,
      y:           0
    })
  })

  it("has the correct .value()", () => {
    expect(letter.value()).toBe(1)

    expect(
      (new Letter("X")).value(8)
    ).toBe(8)
  })

  it("can have a multiplier applied", () => {
    letter._multiplier = 3
    expect(letter.value()).toBe(3)
  })

  it("can be instantiated with a multiplier", () => {
    const z = new Letter("Z", {multiplier: 10})
    expect(z.value()).toBe(100)
  })

  it("can be instantiated with indices", () => {
    const j = new Letter("j", {x: 2, y: 3})
    expect(j.toJSON().y).toBe(3)
  })
})
