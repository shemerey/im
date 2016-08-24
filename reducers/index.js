'use babel'

import { handleActions } from 'redux-actions'
import { getMessage } from '../actions'

export default handleActions({
  [getMessage]: (state, action) => {
    const {id, type, username, channel, message} = action.payload
    const msgsKey = type + id + channel
    return {
      ...state,
      [msgsKey]: [...state[msgsKey], message]
    }
  }
}, { })
