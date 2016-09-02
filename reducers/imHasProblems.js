'use babel'

import { handleActions } from 'redux-actions'
import { imHasProblemsAction, imHasNoProblemsAction } from '../actions'

export default handleActions({
  [imHasProblemsAction]: (state, action) => {
    return {
      message: action.payload.message,
    }
  },
  [imHasNoProblemsAction]: () => {
    return {}
  },
}, {})
