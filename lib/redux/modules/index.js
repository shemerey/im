'use babel'

/*

import { handleActions } from 'redux-actions'
import {
  // Application Level
  setVisiable,
  registerTheTeam,
  // Team
  addNewTeam,
  updateTeam,
  setCurrentTeam,
  // User
  setAllUsers,
  addChannels,
  removeChannel,
  addNewUser,
  updateUser,
  // Channel
  setAllChannels,
  setActiveChannel,
  addNewChannel,
  updateChannel,
  // Messages
  sendMessage,
  reciveMessage,
  updateMessage,
  replaceMessage,
  setAllMessages,
  addMessages,
} from './actions'


export const isVisible = handleActions({
  // set Application is visiable or hiden
  [setVisiable]: (state, action) => action.payload,
}, false)

// ================= Team Managment ===========================================================

export const currentTeam = handleActions({
  // add first team as default current
  [addNewTeam]: (state, action) => {
    if (!state) {
      return action.payload
    }
    return state
  },

  // update current team if it match
  [updateTeam]: (state, action) => {
    if (state && state.id === action.payload.id) {
      return action.payload
    }
    return state
  },

  // set selected team as current
  [setCurrentTeam]: (state, action) => action.payload ? action.payload : state,
}, null)

// ================== User Managment ==========================================================
export const users = handleActions({
  // initial set all users
  [setAllUsers]: (state, action) => {
    const { users, teamId } = action.payload
    return {
      ...state,
      [teamId]: users.reduce((acc, user) => {
        acc[user.id] = user
        return acc
      }, {}),
    }
  },

  // add each new team to the store
  [addNewUser]: (state, action) => {
    const user = action.payload
    const teamUsers = state[user.teamId] || {}
    return {
      ...state,
      [user.teamId]: {
        ...teamUsers,
        [user.id]: user,
      },
    }
  },

  // update provided user
  [updateUser]: (state, action) => {
    const user = action.payload
    const teamUsers = state[user.teamId] || {}
    return {
      ...state,
      [user.teamId]: {
        ...teamUsers,
        [user.id]: user,
      },
    }
  },
}, {})

// ================== Channel Managment =======================================================
export const activeChannels = handleActions({
  // set first channel as default on initial load
  [setAllChannels]: (state, action) => {
    const { channels, teamId } = action.payload
    const activeChannel = state[teamId] || channels.filter((ch) => ch.isMember)[0]
    return {
      ...state,
      [teamId]: activeChannel,
    }
  },

  // set first channel as default if no channel selected
  [addChannels]: (state, action) => {
    const { channels, teamId } = action.payload
    const activeChannel = state[teamId] || channels.filter((ch) => ch.isMember)[0]
    return {
      ...state,
      [teamId]: activeChannel,
    }
  },

  // set provided channel as selected
  [setActiveChannel]: (state, action) => {
    const channel = action.payload

    channel.lastRead = new Date()
    channel.unreadCount = 0

    return {
      ...state,
      [channel.teamId]: channel,
    }
  },

  // add each new channel
  [addNewChannel]: (state, action) => {
    const channel = action.payload
    return {
      ...state,
      [channel.teamId]: channel,
    }
  },

  // update channel
  [removeChannel]: (state, action) => {
    const channel = action.payload

    const isCurrentActive = state[channel.teamId] || {}

    if (isCurrentActive.id !== channel.id) {
      return state
    }

    return {
      ...state,
      [channel.teamId]: undefined,
    }
  },

  // update channel
  [updateChannel]: (state, action) => {
    const channel = action.payload

    if (channel.id === (state[channel.teamId] || {}).id) {
      return {
        ...state,
        [channel.teamId]: channel,
      }
    }

    if (!action.payload.isMember) {
      return state
    }

    return {
      ...state,
      [channel.teamId]: state[channel.teamId] || channel,
    }
  },
}, {})

export const channels = handleActions({
  // initial set all channels
  [setAllChannels]: (state, action) => {
    const { channels, teamId } = action.payload
    return {
      ...state,
      [teamId]: channels.reduce((acc, channel) => {
        acc[channel.id] = channel
        return acc
      }, {}),
    }
  },

  // Add channels
  [addChannels]: (state, action) => {
    const { channels, teamId } = action.payload
    const currentChannels = state[teamId] || {}
    return {
      ...state,
      [teamId]: channels.reduce((acc, channel) => {
        acc[channel.id] = channel
        return acc
      }, currentChannels),
    }
  },

  // add each new channel
  [addNewChannel]: (state, action) => {
    const channel = action.payload
    const teamChannels = state[channel.teamId] || {}
    return {
      ...state,
      [channel.teamId]: {
        ...teamChannels,
        [channel.id]: channel,
      },
    }
  },

  // add each new channel
  [removeChannel]: (state, action) => {
    const channel = action.payload
    const teamChannels = state[channel.teamId] || {}
    const channelToRemove = teamChannels[channel.id]
    channelToRemove.isMember = false
    channelToRemove.status = 'online'
    return {
      ...state,
      [channel.teamId]: {
        ...teamChannels,
        [channel.id]: channelToRemove,
      },
    }
  },

  // update channel
  [updateChannel]: (state, action) => {
    const channel = action.payload
    const teamChannels = state[channel.teamId] || {}
    return {
      ...state,
      [channel.teamId]: {
        ...teamChannels,
        [channel.id]: channel,
      },
    }
  },

  // when channel is active reset unread count
  [setActiveChannel]: (state, action) => {
    const channel = action.payload
    channel.lastRead = new Date()
    channel.unreadCount = 0
    const teamChannels = state[channel.teamId] || {}
    return {
      ...state,
      [channel.teamId]: {
        ...teamChannels,
        [channel.id]: channel,
      },
    }
  },
}, {})

export const messages = handleActions({
  // initial set all messages in a channel
  [setAllMessages]: (state, action) => {
    const messages = action.payload
    const { teamId, channelId } = messages[0]
    const key = `${teamId}#${channelId}`

    return {
      ...state,
      [key]: messages.reduce((acc, message) => {
        acc[message.id] = message
        return acc
      }, {}),
    }
  },

  [addMessages]: (state, action) => {
    const messages = action.payload
    const { teamId, channelId } = messages[0]
    const key = `${teamId}#${channelId}`
    const channelMessages = state[key] || {}

    return {
      ...state,
      [key]: messages.reduce((acc, message) => {
        acc[message.id] = message
        return acc
      }, channelMessages),
    }
  },

  // add each new channel
  [sendMessage]: (state, action) => {
    const message = action.payload
    const { teamId, channelId } = action.payload
    const key = `${teamId}#${channelId}`
    const channelMessages = state[key] || {}

    return {
      ...state,
      [key]: {
        ...channelMessages,
        [message.id]: message,
      },
    }
  },

  // recive message
  [reciveMessage]: (state, action) => {
    const message = action.payload
    const { teamId, channelId } = action.payload
    const key = `${teamId}#${channelId}`
    const channelMessages = state[key] || {}

    return {
      ...state,
      [key]: {
        ...channelMessages,
        [message.id]: message,
      },
    }
  },

  // update message
  [updateMessage]: (state, action) => {
    const message = action.payload
    const { teamId, channelId } = action.payload
    const key = `${teamId}#${channelId}`
    const channelMessages = state[key] || {}
    return {
      ...state,
      [key]: {
        ...channelMessages,
        [message.id]: message,
      },
    }
  },

  // add each new channel
  [replaceMessage]: (state, action) => {
    const [from, to] = action.payload

    const { teamId, channelId } = from
    const key = `${teamId}#${channelId}`
    const channelMessages = state[key] || {}

    // remove existing message
    delete channelMessages[from.id]

    return {
      ...state,
      [key]: {
        ...channelMessages,
        [to.id]: to,
      },
    }
  },
}, {})
*/
