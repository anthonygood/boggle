import makeGrid from "../makeGrid"

it("returns an array according to the size argument", () => {
  expect(makeGrid(3).length).toEqual(3)
})

it("returns an array of array (all the same size!)", () => {
  makeGrid(2).forEach(item => {
    expect(item.length).toEqual(2)
  })
})

it("sub arrays contain letters", () => {
  expect(typeof makeGrid(2)[0][0]).toEqual("string")
})
