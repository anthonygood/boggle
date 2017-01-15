import boggle from "../boggle-reducer"

describe("boggleReducer", () => {
  const state = boggle()

  it("returns default state when state parameter is undefined", () => {
    expect(state.currentWord).toEqual([])
    expect(state.foundWords).toEqual([])
    expect(state.grid).toBeDefined()
    expect(state.score).toEqual(0)
    expect(state.selecting).toBe(false)
  })

  it("updates state for the action START_SELECTING_LETTERS", () => {
    const newState = boggle(state, {type: "START_SELECTING_LETTERS"})
    expect(newState.selecting).toBe(true)
  })

  it("updates state for the action END_SELECTING_LETTERS", () => {
    const newState = boggle(state, {type: "END_SELECTING_LETTERS"})
    expect(newState.selecting).toBe(false)
  })

  describe("ADD_LETTER", () => {
    const newState = boggle(
      state,
      {
        type: "ADD_LETTER",
        letter:
          {
            letter: "X",
            baseValue: 1,
            multiplier: 5,
            x: 1,
            y: 2,
            value: 5
          }
      }
    )

    expect(newState.currentWord).toEqual([
      {
        letter: "X",
        baseValue: 1,
        multiplier: 5,
        x: 1,
        y: 2,
        value: 5
      }
    ])
  })
})
