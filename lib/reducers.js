'use babel'

import { handleActions } from 'redux-actions'
import {
  // Team
  addNewTeam,
  updateTeam,
  setCurrentTeam,
  // User
  setAllUsers,
  addChannels,
  addNewUser,
  updateUser,
  // Channel
  setAllChannels,
  setActiveChannel,
  addNewChannel,
  updateChannel,
  // Messages
  sendMessage,
} from './actions'

// ================= Team Managment ===========================================================
export const teams = handleActions({
  // add each new team to the store
  [addNewTeam]: (state, action) => [...state, action.payload],

  // update team object
  [updateTeam]: (state, action) => state.map((team) => (team.id === action.payload.id) ? action.payload : team),
}, [])

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
        [user.id]: user
      },
    }
  },
}, {})

// ================== Channel Managment =======================================================
export const activeChannels = handleActions({
  // set first channel as default on initial load
  [setAllChannels]: (state, action) => {
    const { channels, teamId } = action.payload
    return {
      ...state,
      [teamId]: channels.filter((ch) => ch.isMember)[0],
    }
  },

  // set first channel as default if no channel selected
  [addChannels]: (state, action) => {
    const { channels, teamId } = action.payload
    return {
      ...state,
      [teamId]: state[teamId] || channels.filter((ch) => ch.isMember)[0],
    }
  },

  // set provided channel as selected
  [setActiveChannel]: (state, action) => {
    const { channel, teamId } = action.payload
    return {
      ...state,
      [teamId]: channel,
    }
  },

  // add each new channel
  [addNewChannel]: (state, action) => {
    const channel = action.payload
    return {
      ...state,
      [channel.teamId]: state[channel.teamId] || channel,
    }
  },

  // update channel
  [updateChannel]: (state, action) => {
    const channel = action.payload
    if (state[channel.teamId] && channel.id === state[channel.teamId].id) {
      return {
        ...state,
        [channel.teamId]: channel,
      }
    } else {
      return state
    }
  },
}, {})

export const channels = handleActions({
  // initial set all channels
  [setAllChannels]: (state, action) => {
    const { channels, teamId } = action.payload
    return {
      ...state,
      [teamId]: channels,
    }
  },

  // Add channels
  [addChannels]: (state, action) => {
    const { channels, teamId } = action.payload
    const teamChannels = state[teamId] || []
    return {
      ...state,
      [teamId]: [...teamChannels, ...channels],
    }
  },

  // add each new channel
  [addNewChannel]: (state, action) => {
    const channel = action.payload
    const teamChannels = state[channel.teamId] || []
    return {
      ...state,
      [channel.teamId]: [...teamChannels, channel],
    }
  },

  // update channel
  [updateChannel]: (state, action) => {
    const channel = action.payload
    const teamChannels = state[channel.teamId] || []
    return {
      ...state,
      [channel.teamId]: teamChannels.map((ch) => ch.id === channel.id ? channel : ch),
    }
  },
}, {})

export const messages = handleActions({
  // add each new channel
  [sendMessage]: (state, action) => {
    const { teamId, message, message: { channelId } } = action.payload
    const key = `${teamId}#${channelId}`
    const channelMessages = state[key] || []
    return {
      ...state,
      [key]: [...channelMessages, message],
    }
  },
}, {})
