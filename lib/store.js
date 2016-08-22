'use babel'

import { createStore } from 'redux'
import { createAction, handleAction, handleActions } from 'redux-actions'

function rootReducer(state = {}, action) {
  return state
}


// FIXME: replace with getting real data
import atom_msgs from '../atom_msgs'
import gett_msgs from '../gett_msgs'
import sphere_msgs from '../sphere_msgs'

let initialState = {
  teams: [
    {
      id: 1,
      name: 'Atom',
      active: false,
      img: 'https://avatars0.githubusercontent.com/u/1089146?v=3&s=100'
    },
    {
      id: 2,
      name: 'Sphere Inc',
      active: false,
      img: 'https://avatars3.githubusercontent.com/u/182102?v=3&s=200'
    },
    {
      id: 3,
      name: 'Gett',
      active: true,
      img: 'http://therewardboss.com/wp-content/uploads/2014/05/gett-logo-only-150x150.png'
    }
  ],
  1: atom_msgs,
  2: gett_msgs,
  3: sphere_msgs,
}

export default createStore(
  rootReducer,
  initialState
)
