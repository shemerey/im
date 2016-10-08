'use babel'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'


import * as reducers from './reducers'
import mySaga from './sagas'

const logger = createLogger()
const sagaMiddleware = createSagaMiddleware()

export default createStore(
  combineReducers(reducers),
  {
    currentTeam: null,
    teams: [],
    activeChannels: {},
    channels: {},
    users: {},
    messages: {},
  },
  applyMiddleware(logger, sagaMiddleware)
)

sagaMiddleware.run(mySaga)
