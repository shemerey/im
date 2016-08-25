'use babel'

import { createAction } from 'redux-actions'

// IrcProvider Actions
export const getMessage = createAction('get message')
export const setChennals = createAction('get list of chennals')
export const say = createAction('say')





// export const setColor = createAction('set color')


// import { handleActions } from 'redux-actions'
//
// export default handleActions({
//   'set color' (state, action) {
//     return action.payload.hex
//   }
// }, '#ff0000')
