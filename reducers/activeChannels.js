'use babel'

import { handleActions } from 'redux-actions'
import { setActiveChannels } from '../actions'

export default handleActions({
  [setActiveChannels]: (state, action) => {
    let { teamId, channels } = action.payload
    return {
      ...state,
      [teamId]: channels
    }
  }
}, {})
