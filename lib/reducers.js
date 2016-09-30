'use babel'

import { handleActions } from 'redux-actions'
import {
  addNewTeam,
  setCurrentTeam
} from './actions'

export const teams = handleActions({
  // add each new team to the store
  [addNewTeam]: (state, action) => [...state, action.payload],
}, [])

export const currentTeam = handleActions({
  // add first team as default current
  [addNewTeam]: (state, action) => {
    if (!state) {
      return action.payload
    }

    return state
  },

  // set selected team as current
  [setCurrentTeam]: (state, action) => action.payload,
}, null)
