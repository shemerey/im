'use babel'

import { createAction } from 'redux-actions'

// IrcProvider Actions
export const addTeam = createAction('add new team')
export const setchannels = createAction('set channels')
export const getMessage = createAction('get message')
export const say = createAction('say')
