'use babel'

import { handleActions } from 'redux-actions'
import { setActiveChannels } from '../actions'

export default handleActions({
  [setActiveChannels]: (state, action) => {
    let { teamId, channels } = action.payload
    let currentListOfChannels  = state[teamId] || []
    return {
      ...state,
      [teamId]: [...currentListOfChannels, ...channels]
    }
  }
}, {})
