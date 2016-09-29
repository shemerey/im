'use babel'

import { handleActions } from 'redux-actions'
import { addNewTeam } from './actions'

export const teams = handleActions({
  [addNewTeam]: (state, action) => [...state, team],
}, [])
