import detect from "../areAdjacent"

describe("areAdjacent", () => {
  it("correctly detects adjacent tiles", () => {
    const adjacentOne = [{x: 0, y: 0},{x: 1, y: 1}]
    const adjacentTwo = [{x: 2, y: 1},{x: 1, y: 1}]
    const nonAdjOne   = [{x: 3, y: 3},{x: 3, y: 1}]
    const nonAdjTwo   = [{x: 3, y: 1},{x: 1, y: 1}]

    expect(detect(...adjacentOne)).toBe(true)
    expect(detect(...adjacentTwo)).toBe(true)
    expect(detect(...nonAdjOne)).toBe(false)
    expect(detect(...nonAdjTwo)).toBe(false)
  })
})
