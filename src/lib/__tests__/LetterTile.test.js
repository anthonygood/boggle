import LetterTile from "../LetterTile.js"

describe("LetterTile", () => {
  let tile = new LetterTile("A")

  it("has a letter attribute", () => {
    expect(tile.letter).toBe("A")
  })

  it("has the correct .value()", () => {
    expect(tile.value()).toBe(1)

    expect(
      (new LetterTile("X")).value(8)
    ).toBe(8)
  })

  it("can have a multiplier applied", () => {
    tile.multiplier = 3
    expect(tile.value()).toBe(3)
  })

  it("can be instantiated with a multiplier", () => {
    const z = new LetterTile("Z", 10)
    expect(z.value()).toBe(100)
  })

})
