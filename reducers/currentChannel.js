'use babel'

import { handleActions } from 'redux-actions'
import { setCurrentChannel } from '../actions'

export default handleActions({
  [setCurrentChannel]: (state, action) => action.payload
}, '#general')
