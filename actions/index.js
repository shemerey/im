'use babel'

import { createAction } from 'redux-actions'

// IrcProvider Actions
export const addTeam = createAction('add new team')
export const setChannels = createAction('set channels')
export const setUsers = createAction('set users')
export const setActiveChannels = createAction('set active channels')
export const getMessage = createAction('get message')
export const sendMessage = createAction('send message')
export const markMessageAsRecived = createAction('mark message as recived')
export const setCurrentTeam = createAction('set currentTeam')
export const setCurrentChannel = createAction('set currentChannel')
