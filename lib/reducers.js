'use babel'

import { handleActions } from 'redux-actions'
import {
  addNewTeam,
  updateTeam,

  setAllUsers,
  addNewUser,
  updateUser,

  setAllChannels,
  addNewChannel,
  updateChannel,

  setCurrentTeam
} from './actions'

export const teams = handleActions({
  // add each new team to the store
  [addNewTeam]: (state, action) => [...state, action.payload],
  [updateTeam]: (state, action) =>  state.map((team) => (team.id === action.payload.id) ? action.payload : team),
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
  [setCurrentTeam]: (state, action) => action.payload,
}, null)

export const users = handleActions({
  [setAllUsers]: (state, action) => {
    const { users, teamId } = action.payload
    return {
      ...state,
      [teamId]: users
    }
  },
  // add each new team to the store
  [addNewUser]: (state, action) => {
    const user = action.payload
    let teamUsers = state[user.teamId] || []
    return {
      ...state,
      [user.teamId]: [...teamUsers, user]
    }
  },
}, {})

export const channels = handleActions({
  [setAllChannels]: (state, action) => {
    const { channels, teamId } = action.payload
    return {
      ...state,
      [teamId]: channels
    }
  },
  // add each new channel
  [addNewChannel]: (state, action) => {
    const channel = action.payload
    let teamChannels = state[channel.teamId] || []
    return {
      ...state,
      [channel.teamId]: [...teamChannels, channel]
    }
  },
}, {})
