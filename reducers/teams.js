'use babel'

import { handleActions } from 'redux-actions'
import { addTeam } from '../actions'

export default handleActions({
  [addTeam]: (state, action) => {
    const { id, name, icon  } = action.payload
    const team = {
      id,
      name,
      icon
    }
    return [...state, team]
  }
}, [])
