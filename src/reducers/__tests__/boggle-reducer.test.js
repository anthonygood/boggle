import boggle from "../boggle-reducer"

describe("boggleReducer", () => {
  const state = boggle()

  it("returns default state when state parameter is undefined", () => {
    expect(state.foundWords).toEqual([])
    expect(state.score).toEqual(0)
    expect(state.selecting).toBe(false)
    expect(state.grid).toBeDefined()
  })

  it("updates state for the action START_SELECTING_LETTERS", () => {
    const newState = boggle(state, {type: "START_SELECTING_LETTERS"})
    expect(newState.selecting).toBe(true)
  })

  it("updates state for the action END_SELECTING_LETTERS", () => {
    const newState = boggle(state, {type: "END_SELECTING_LETTERS"})
    expect(newState.selecting).toBe(false)
  })
})
