import { fromJS } from 'immutable'

import * as gamesActions from './gamesActions'

const INITAL_STATE = fromJS({
  games: {},
  fetchingGames: false
})

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case gamesActions.REQUEST_GAMES:
      return state.setIn(['fetchingGames'], true)
    case gamesActions.RECEIVE_GAMES:
      return state.setIn(['games'], fromJS(action.gameObj)).set('fetchingGames', false)
    default:
      return state
  }
}
