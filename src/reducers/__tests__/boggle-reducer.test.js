import boggle from "../boggle-reducer"

describe("boggleReducer", () => {
  it("returns default state when state parameter is undefined", () => {
    expect(boggle(undefined, {type: "START_SELECTING_LETTERS"})).toEqual(
      {
        foundWords: [],
        score: 0,
        selecting: true
      }
    )
  })

  it("updates state for the action END_SELECTING_LETTERS", () => {
    const state = boggle()
    expect(boggle(state, {type: "END_SELECTING_LETTERS"}).selecting).toBe(false)
  })
})
