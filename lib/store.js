'use babel'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'
import { createAction, handleAction, handleActions } from 'redux-actions'

import {
  teams,
  channels,
  users,
  activeChannels,
  messages,
  currentTeam,
  currentChannel
} from '../reducers'

const rootReducer = combineReducers({
  teams,
  channels,
  users,
  activeChannels,
  messages,
  currentTeam,
  currentChannel,
})

const logger = createLogger()

let initialState = {
  currentTeam: 1,
  currentChannel: '#general',
  /*
  teams: [
    {
      id,
      name,
      active,
      icon
    }
  ],
  */
  teams: [],
  channels: {
    /* {provId}: [
          {
            name: '#general',
            topic: undefined,
            users: 2
          }
        ]
    */
    1: [
      {
        name: '#general',
        topic: undefined,
        users: 2
      },
    ]
  },
  activeChannels: {
    /* {provId}: [
        {
          name: '#general',
          unread: true,
          current: false,
          users: 5
        }
      ]
     */
    1: [
        {
          name: '#general',
          unread: true,
          current: false,
          users: 5
        },
      ]
  },
  users: {
    /*
     {provId}: [
      {
        id: 'anton@some.host.com',
        username: 'anton',
      },
     ]
    */
    1: [
      {
        id: 'anton@some.host.com',
        username: 'anton',
      },
      {
        id: 'zork@some.other.host.com',
        username: 'zork',
      },
    ]
  },
  activeUsers: {
    // {provId}
    1: [
      {
        id: 'anton@some.host.com',
        username: 'anton',
      },
      {
        id: 'zork@some.other.host.com',
        username: 'zork',
      },
    ]
  },
  messages: {
    /*
    {provId}#{chennelId}: [
      {
        username: 'anton',
        to: '#general',
        text: 'hi there...',
        created_at: new Date(),
      }
    ]
    */
    '1#general': [
      {
        username: 'anton',
        to: '#general',
        text: 'hi there...',
        created_at: new Date(),
      }
    ]
  }
}

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(logger)
)
