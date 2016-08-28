'use babel'

import { handleActions } from 'redux-actions'
import { setActiveUsers } from '../actions'

export default handleActions({
  [setActiveUsers]: (state, action) => {
    let { teamId, users } = action.payload
    return {
      ...state,
      [teamId]: users
    }
  }
}, {})
