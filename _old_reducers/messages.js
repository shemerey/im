'use babel'

import { handleActions } from 'redux-actions'
import { getMessage, sendMessage, markMessageAsRecived } from '../actions'

export default handleActions({
  // Send Meesage to server
  [sendMessage]: (state, action) => {
    const {teamId, username, to, text} = action.payload
    const teamIdAndChannel = `${teamId}${to.id}`
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
  // Mark message as recived
  [markMessageAsRecived]: (state, action) => {
    const {teamId, username, to, text} = action.payload
    const teamIdAndChannel = `${teamId}${to.id}`
    let channelMessages = state[teamIdAndChannel] || []

    const message = {
      username,
      to,
      text,
      created_at: new Date(),
      status: 'recived'
    }

    channelMessages = channelMessages.filter((m) => {
      if (m.username === username && m.to === to && m.text === text) {
        return false
      }
      return true
    })

    return {
      ...state,
      [teamIdAndChannel]: [...channelMessages, message]
    }
  },
  // Get Message from Server
  [getMessage]: (state, action) => {
    const {teamId, username, to, text} = action.payload
    const teamIdAndChannel = `${teamId}${to.id}`
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
