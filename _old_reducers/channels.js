'use babel'

import { handleActions } from 'redux-actions'
import { setChannels } from '../actions'

export default handleActions({
  [setChannels]: (state, action) => {
    const { teamId, channels } = action.payload
    const currentListOfChannels  = state[teamId] || []
    return {
      ...state,
      [teamId]: [...currentListOfChannels, ...channels]
    }
  }
}, {})
