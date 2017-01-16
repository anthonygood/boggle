import boggle from "../boggle-reducer"

describe("boggleReducer", () => {
  const state = boggle()

  it("returns default state when state parameter is undefined", () => {
    expect(state.gamePhase).toBe("notStarted")
    expect(state.currentWord).toEqual([])
    expect(state.foundWords).toEqual([])
    expect(state.grid).toEqual([])
    expect(state.score).toEqual(0)
    expect(state.selecting).toBe(false)
  })

  describe("START_SELECTING_LETTERS", () => {
    it("updates state for the action START_SELECTING_LETTERS", () => {
      const newState = boggle(state, {type: "START_SELECTING_LETTERS"})
      expect(newState.selecting).toBe(true)
    })
  })

  describe("END_SELECTING_LETTERS", () => {
    it("updates state for the action END_SELECTING_LETTERS", () => {
      const newState = boggle(state, {type: "END_SELECTING_LETTERS"})
      expect(newState.selecting).toBe(false)
    })
  })

  describe("START_GAME", () => {
    const grid = ["someGrid"]
    const newState = boggle(state, { type: "START_GAME", grid })

    it("adds grid to state", () => {
      expect(newState.grid).toEqual(grid)
    })

    it("sets gamePhase to 'started'", () => {
      expect(newState.gamePhase).toBe("started")
    })
  })

  describe("END_GAME", () => {
    const newState = boggle(state, { type: "END_GAME" })

    it("sets gamePhase to 'finished'", () => {
      expect(newState.gamePhase).toBe("finished")
    })
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

    it("adds letter to currentWord", () => {
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
})
