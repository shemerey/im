'use babel'

import { createAction } from 'redux-actions'

// ================= Team Managment ===========================================================
export const setCurrentTeam = createAction('setCurrentTeam')
export const addNewTeam = createAction('addNewTeam')
export const updateTeam = createAction('updateTeam')

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
