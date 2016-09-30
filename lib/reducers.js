'use babel'

import { handleActions } from 'redux-actions'
import {
  addNewTeam,
  updateTeam,
  setCurrentTeam
} from './actions'

export const teams = handleActions({
  // add each new team to the store
  [addNewTeam]: (state, action) => [...state, action.payload],
  [updateTeam]: (state, action) =>  state.map((team) => (team.id === action.payload.id) ? action.payload : team),
}, [])

export const currentTeam = handleActions({
  // add first team as default current
  [addNewTeam]: (state, action) => {
    if (!state) {
      return action.payload
    }

    return state
  },

  // update current team if it match
  [updateTeam]: (state, action) => {
    if (state && state.id === action.payload.id) {
      return action.payload
    }

    return state
  },


  // set selected team as current
  [setCurrentTeam]: (state, action) => action.payload,
}, null)
