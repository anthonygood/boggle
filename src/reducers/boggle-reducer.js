import * as TYPES from '../actions/action-types'

const DEFAULT_STATE = {
  foundWords: [],
  score: 0,
  selecting: true
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
