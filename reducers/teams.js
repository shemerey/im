'use babel'

import { handleActions } from 'redux-actions'
import { addTeam } from '../actions'

export default handleActions({
  [addTeam]: (state, action) => {
    const active = (state.length === 0)
    const { id, name, icon  } = action.payload
    const team = {
      id,
      name,
      active,
      icon
    }
    return [...state, team]
  }
}, [])
