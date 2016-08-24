'use babel'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'
import { createAction, handleAction, handleActions } from 'redux-actions'
import rootReducer from '../reducers'

const logger = createLogger()

let initialState = {

}

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(logger)
)
