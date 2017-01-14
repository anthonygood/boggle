import pickLetters from "../pickLetters"

it("returns an array", () => {
  expect(typeof pickLetters(1).pop).toEqual("function")
})

it("array contains as many letters as the parameter passed", () => {
  expect(pickLetters(2).length).toEqual(2)
  expect(pickLetters(3).length).toEqual(3)
})

it("works without any arguments", () => {
  expect(pickLetters().length).toEqual(0)
})
