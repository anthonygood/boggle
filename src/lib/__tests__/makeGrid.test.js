import makeGrid from "../makeGrid"

it("returns an array according to the size argument", () => {
  expect(makeGrid(3).length).toEqual(3)
})

it("returns an array of array (all the same size!)", () => {
  makeGrid(2).forEach(item => {
    expect(item.length).toEqual(2)
  })
})

it("sub arrays contain JSON", () => {
  const json = makeGrid(2)[0][0]
  expect(typeof json.letter).toBe("string")
  expect(json.value).toBeDefined()
  expect(json.multiplier).toBeDefined()
})
