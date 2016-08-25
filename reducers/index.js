'use babel'

import teamsReducer from './teamsReducer'

export {
  teamsReducer
}

// import { handleActions } from 'redux-actions'
// import { getMessage } from '../actions'
//
// export default handleActions({
//   [getMessage]: (state, action) => {
//     const {id, type, username, channel, message} = action.payload
//     const msgsKey = type + id + channel
//     console.log(msgsKey)
//     // return {
//     //   ...state,
//     //   [msgsKey]: [...state[msgsKey], message] // }
//     return {
//       ...state,
//       [msgsKey]: {x: 11}
//     }
//   }
// }, {})
