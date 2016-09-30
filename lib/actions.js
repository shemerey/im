'use babel'

import { createAction } from 'redux-actions'

export const setCurrentTeam = createAction('setCurrentTeam')
export const addNewTeam = createAction('addNewTeam')
export const updateTeam = createAction('updateTeam')

export const addNewUser = createAction('addNewUser')
export const updateUser = createAction('updateUser')

export const addNewChannel = createAction('addNewChannel')
export const updateChannel = createAction('updateChannel')
