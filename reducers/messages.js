'use babel'

import { handleActions } from 'redux-actions'
import { getMessage, sendMessage } from '../actions'

export default handleActions({
  // Send Meesage to server
  [sendMessage]: (state, action) => {
    const {teamId, username, to, text} = action.payload
    const teamIdAndChannel = `${teamId}${to}`
    const channelMessages = state[teamIdAndChannel] || []

    const message = {
      username,
      to,
      text,
      created_at: new Date(),
      status: 'sent'
    }
    return {
      ...state,
      [teamIdAndChannel]: [...channelMessages, message]
    }
  },
  // Get Message from Server
  [getMessage]: (state, action) => {
    const {teamId, username, to, text} = action.payload
    const teamIdAndChannel = `${teamId}${to}`
    const channelMessages = state[teamIdAndChannel] || []

    const message = {
      username,
      to,
      text,
      created_at: new Date()
    }
    return {
      ...state,
      [teamIdAndChannel]: [...channelMessages, message]
    }
  }
}, {})
