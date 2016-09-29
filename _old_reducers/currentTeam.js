'use babel'

import { handleActions } from 'redux-actions'
import { setCurrentTeam } from '../actions'

export default handleActions({
  [setCurrentTeam]: (state, action) => action.payload
}, 1)
