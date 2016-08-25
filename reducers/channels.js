'use babel'

import { handleActions } from 'redux-actions'
import { setChannels } from '../actions'

export default handleActions({
  [setChannels]: (state, action) => {
    const { teamId, channels } = action.payload
    return {
      ...state,
      [teamId]: channels
    }
  }
}, {})
