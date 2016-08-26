'use babel'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'
import { createAction, handleAction, handleActions } from 'redux-actions'

import {
  teams,
  channels,
  activeChannels,
  messages,
  currentTeam,
  currentChannel
} from '../reducers'

const rootReducer = combineReducers({
  teams,
  channels,
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
      {
        name: '#random',
        topic: undefined,
        users: 2
      }
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
        {
          name: '#random',
          unread: false,
          current: true,
          users: 14
        }
      ]
  },
  listOfUsers: {
    /*
     {provId}: [
      {
        username: 'anton',
        fullName: 'Anton Shemerey'
      },
     ]
    */
    1: [
      {
        username: 'anton',
        fullName: 'Anton Shemerey'
      },
      {
        username: 'zork',
        fullName: 'Paverl Meronov'
      },
    ]
  },
  activeUsers: {
    // {provId}
    1: [
      {
        username: 'anton',
        fullName: 'Anton Shemerey'
      },
      {
        username: 'zork',
        fullName: 'Paverl Meronov'
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
