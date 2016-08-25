'use babel'

import { handleActions } from 'redux-actions'
import { addTeam } from '../actions'

export default handleActions({
  [addTeam]: (state, action) => {
    // const {id, type, username, channel, message} = action.payload
    // const msgsKey = type + id + channel
    // console.log(msgsKey)
    // // return {
    // //   ...state,
    // //   [msgsKey]: [...state[msgsKey], message] // }
    // return {
    //   ...state,
    //   [msgsKey]: {x: 11}
    // }
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
