'use babel'

import { handleActions } from 'redux-actions'
import { setUsers } from '../actions'

export default handleActions({
  [setUsers]: (state, action) => {
    const { teamId, users } = action.payload
    return {
      ...state,
      [teamId]: users
    }
  }
}, {})
