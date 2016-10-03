'use babel'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'

import * as reducers from './reducers'

const logger = createLogger()

export default createStore(
  combineReducers(reducers),
  {
    currentTeam: null,
    teams: [],
    activeChannels: {},
    channels: {},
    users: {},
    messages: {}
  },
  applyMiddleware(logger)
)
