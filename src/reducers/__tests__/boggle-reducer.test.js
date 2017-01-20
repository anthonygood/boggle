import boggle from "../boggle-reducer"

describe("boggleReducer", () => {
  const state = boggle()

  it("returns default state when state parameter is undefined", () => {
    expect(state.gamePhase).toBe("notStarted")
    expect(state.currentWord).toEqual([])
    expect(state.foundWords).toEqual({})
    expect(state.grid).toEqual([])
    expect(state.score).toEqual(0)
    expect(state.selecting).toBe(false)
  })

  describe("START_SELECTING_LETTERS", () => {
    it("updates state for the action START_SELECTING_LETTERS", () => {
      const newState = boggle(state, { type: "START_SELECTING_LETTERS" })
      expect(newState.selecting).toBe(true)
    })
  })

  describe("SUBMIT_WORD", () => {
    context("correct", () => {
      const selecting   = true
      const currentWord = [{letter: "C", value: 100},{letter: "A", value: 20},{letter: "T", value: 3}]

      const someState = Object.assign({}, state, { currentWord, selecting })
      const newState  = boggle(someState, { type: "SUBMIT_WORD", word: "cat" })

      it("adds word to foundWords", () => {
        expect(newState.foundWords).toEqual({cat: currentWord}) // 2D array
      })

      it("adds word value to score", () => {
        expect(newState.score).toBe(123)
      })

      it("cancels selecting tiles", () => {
        expect(newState.selecting).toBe(false)
      })

      it("updates lastSubmittedWord", () => {
        expect(newState.lastSubmittedWord).toEqual({ letters: currentWord, status: "correct" })
      })
    })

    context("incorrect", () => {
      const currentWord = [{letter: "X"},{letter: "X"}]
      const someState = Object.assign({}, state, { currentWord })
      const newState = boggle(someState, { type: "SUBMIT_WORD" })

      it("cancels selecting tiles", () => {
        expect(newState.selecting).toBe(false)
      })

      it("updates lastSubmittedWord", () => {
        expect(newState.lastSubmittedWord).toEqual({ letters: currentWord, status: "incorrect" })
      })
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
      state, {
        type: "ADD_LETTER",
        letter: {
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
      expect(newState.currentWord).toEqual([{
        letter: "X",
        baseValue: 1,
        multiplier: 5,
        x: 1,
        y: 2,
        value: 5
      }])
    })

    context("invalid next letter (non-adjacent tile)", () => {
      const furtherState = boggle(newState, {
        type: "ADD_LETTER",
        letter: {
          letter: "Y",
          baseValue: 1,
          multiplier: 5,
          x: 3,
          y: 2,
          value: 5
        }
      }
    )

      it("doesn't add letter", () => {
        expect(furtherState.currentWord.length).toBe(1)
      })
    })
  })
})
