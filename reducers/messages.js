'use babel'

import { handleActions } from 'redux-actions'
import { getMessage } from '../actions'

export default handleActions({
  [getMessage]: (state, action) => {
    const {teamId, username, to, text} = action.payload
    const teamIdAndChannel = `${teamId}${to}`

    const message = {
      username,
      to,
      text,
      created_at: new Date()
    }

    return {
      ...state,
      [teamIdAndChannel]: [...state[teamIdAndChannel], message]
    }
  }
}, {})
