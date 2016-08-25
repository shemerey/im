'use babel'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'
import { createAction, handleAction, handleActions } from 'redux-actions'
import rootReducer from '../reducers'

const logger = createLogger()

let initialState = {
  chennals: {
    {provId}: [
      {
        name: '#general',
        topic: undefined,
        users: 2
      }
    ]
  },
  activeChennals: {
    {provId}: [
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
  users: {
    {provId}: []
  }
  messages: {
    {provId}@{chennelId}: [
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
  rootReducer,
  initialState,
  applyMiddleware(logger)
)
