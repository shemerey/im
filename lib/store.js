'use babel'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'
import { createAction, handleAction, handleActions } from 'redux-actions'

import {
  teams,
  channels,
  activeChannels,
  messages,
  currentTeam,
  currentChannel
} from '../reducers'

const rootReducer = combineReducers({
  teams,
  channels,
  activeChannels,
  messages,
  currentTeam,
  currentChannel,
})

const logger = createLogger()

let initialState = {
  currentTeam: 2,
  currentChannel: {
    id: 'general@chat',
    name: 'general',
    type: 'group',
  },
  teams: [
    {
      id: 2,
      name: 'Default',
      icon: 'http://www.banana.co.tz/wp-content/uploads/2016/04/wpb24349fc_06.png',
    }
  ],
  channels: {
    2: [
      {
        id: 'general@chat',
        name: 'general',
        type: 'group',
        topic: undefined,
        users: 24
      },
      {
        id: 'random@chat',
        name: 'random',
        type: 'group',
        topic: undefined,
        users: 12
      },
      {
        id: 'watercoller@chat',
        name: 'watercoller',
        type: 'group',
        topic: undefined,
        users: 5
      },
      {
        id: 'hidden-chat@chat',
        name: 'hidden-chat',
        type: 'group',
        topic: undefined,
        users: 5
      },
      {
        id: 'anton@brug.xmpp.slack.com',
        name: 'anton',
        type: 'personal',
      },
      {
        id: 'e.shapo@brug.xmpp.slack.com',
        name: 'e.shapo',
        type: 'personal',
      },
      {
        id: 'ilya_rucavicin@brug.xmpp.slack.com',
        name: 'ilya_rucavicin',
        type: 'personal',
      },
      {
        id: 'lee-dohm@brug.xmpp.slack.com',
        name: 'lee-dohm',
        type: 'personal',
      },
    ]
  },
  activeChannels: {
    /* {provId}: [
         id: 'general@chat',
         name: 'general',
         type: 'group',
         topic: undefined,
         users: 24
      ]
     */
     2: [
       {
         id: 'general@chat',
         name: 'general',
         type: 'group',
         topic: undefined,
         users: 24
       },
       {
         id: 'anton@brug.xmpp.slack.com',
         name: 'anton',
         type: 'personal',
       },
       {
         id: 'e.shapo@brug.xmpp.slack.com',
         name: 'e.shapo',
         type: 'personal',
       },
     ]
  },
  messages: {
    /*
    {provId}#{chennelId}: [
      {
        username: 'anton',
        to: 'general@chat',
        text: 'hi there...',
        created_at: new Date(),
      }
    ]
    */
    '2general@chat': [
      {
        username: 'shemerey',
        to: 'general@chat',
        text: 'Приветик',
        created_at: new Date(),
      },
      {
        username: 'Lesya',
        to: 'general@chat',
        text: 'соц опрос))у тебя есть опыт с ember.js?',
        created_at: new Date(),
      },
      {
        username: 'Lesya',
        to: 'general@chat',
        text: "как бы ты его оценил?\n",
        created_at: new Date(),
      },
      {
        username: 'Lesya',
        to: 'general@chat',
        text: '5 - expert/Architect',
        created_at: new Date(),
      },
      {
        username: 'Lesya',
        to: 'general@chat',
        text: '4 - proficient/Senior',
        created_at: new Date(),
      },
      {
        username: 'Lesya',
        to: 'general@chat',
        text: '3 - competent/Middle',
        created_at: new Date(),
      },
      {
        username: 'Lesya',
        to: 'general@chat',
        text: '2 - advanced beginner/Upper Junior',
        created_at: new Date(),
      },
      {
        username: 'Lesya',
        to: 'general@chat',
        text: '1 - beginner/Junior',
        created_at: new Date(),
      },
      {
        username: 'Lesya',
        to: 'general@chat',
        text: '0 - no knowledge',
        created_at: new Date(),
      },
      {
        username: 'shemerey',
        to: 'general@chat',
        text: 'хмм.. мне было бы интресно знать что читают девелоперы))',
        created_at: new Date(),
      },
      {
        username: 'Lesya',
        to: 'general@chat',
        text: 'хорошо :) значит сделаем всем',
        created_at: new Date(),
      },
      {
        username: 'Lesya',
        to: 'general@chat',
        text: 'всем будет ок',
        created_at: new Date(),
      },
      {
        username: 'shemerey',
        to: 'general@chat',
        text: '1 - beginner/Junior',
        created_at: new Date(),
      },
    ]
  }
}

export default createStore(
  rootReducer,
  {},
  applyMiddleware(logger)
)
