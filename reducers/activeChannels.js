'use babel'

import { handleActions } from 'redux-actions'
import { setchannels } from '../actions'

export default handleActions({
  [setchannels]: (state, action) => {
    const { teamId, channels } = action.payload
    return {
      ...state,
      [teamId]: channels
    }
  }
}, {})
