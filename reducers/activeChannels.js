'use babel'

import { handleActions } from 'redux-actions'
import { setActiveChannels } from '../actions'

export default handleActions({
  [setActiveChannels]: (state, action) => {
    let { teamId, channels, currentChannel } = action.payload

    // Set active channel
    channels = channels.map((channel) => {
      const active = (channel.name === currentChannel)
      return {
        ...channel,
        active
      }
    })

    return {
      ...state,
      [teamId]: channels
    }
  }
}, {})
