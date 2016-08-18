'use babel'

import { createStore } from 'redux'
import { createAction, handleAction, handleActions } from 'redux-actions'

function rootReducer(state = {}, action) {
  // console.log(action, state, 'test')
  return state
}

let initialState = {
  teams: [
    {
      id: 1,
      name: 'Atom',
      img: 'https://avatars0.githubusercontent.com/u/1089146?v=3&s=100'
    }
  ]
}

export default createStore(
  rootReducer,
  initialState
)
