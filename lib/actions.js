'use babel'

import { createAction } from 'redux-actions'

// ================= Application Level ========================================================
export const setStatus = createAction('setStatus')
export const registerTheTeam = createAction('registerTheTeam')

// ================= Team Managment ===========================================================
export const setCurrentTeam = createAction('setCurrentTeam')
export const addNewTeam = createAction('addNewTeam')
export const updateTeam = createAction('updateTeam')
export const replaceTeam = createAction('replaceTeam')

// ================== User Managment ==========================================================
export const setAllUsers = createAction('setAllUsers')
export const addNewUser = createAction('addNewUser')
export const updateUser = createAction('updateUser')

// ================== Channel Managment =======================================================
export const setActiveChannel = createAction('setActiveChannel')
export const addChannels = createAction('addChannels')
export const setAllChannels = createAction('setAllChannels')
export const addNewChannel = createAction('addNewChannel')
export const updateChannel = createAction('updateChannel')

// ================== Message Managment =======================================================
export const sendMessage = createAction('sendMessage')
export const updateMessage = createAction('updateMessage')
export const replaceMessage = createAction('replaceMessage', (from, to) => [from, to])
export const setAllMessages = createAction('setAllMessages')
export const addMessages = createAction('addMessages')
