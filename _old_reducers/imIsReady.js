'use babel'

import { handleActions } from 'redux-actions'
import { imIsReadyAction } from '../actions'

export default handleActions({
  [imIsReadyAction]: () => {
    return true
  },
}, false)
