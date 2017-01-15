import * as TYPES from '../actions/action-types'
import makeGrid from "../lib/makeGrid"

const DEFAULT_GRID_SIZE = 4

const DEFAULT_STATE = {
  grid: makeGrid(DEFAULT_GRID_SIZE),
  foundWords: [],
  score: 0,
  selecting: false
}

export default (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case TYPES.START_SELECTING_LETTERS:
      return Object.assign({}, state, { selecting: true })
    case TYPES.END_SELECTING_LETTERS:
      return Object.assign({}, state, { selecting: false })
    default:
      return state
  }
}
