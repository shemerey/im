'use babel'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'
import { createAction, handleAction, handleActions } from 'redux-actions'
import { teamsReducer } from '../reducers'

// function rootReducer(state) {
//   return state
// }

const logger = createLogger()

let initialState = {
  teams: [],
  listOfChennals: {
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
  activeChennals: {
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
        from: 'anton',
        to: '#general',
        text: 'hi there...',
        created_at: new Date(),
      }
    ]
    */
    '1#general': [
      {
        from: 'anton',
        to: '#general',
        text: 'hi there...',
        created_at: new Date(),
      }
    ]
  }
}

export default createStore(
  combineReducers({
    teams: teamsReducer,
  }),
  initialState,
  applyMiddleware(logger)
)
