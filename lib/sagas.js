'use babel'

import { takeEvery, delay } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'

import TeamLoader from './TeamLoader'
import MessageObject from './MessageObject'

function fetchChannelHistory(channel) {
  return (new TeamLoader()).find(channel.teamId).history(channel)
  .then(response => ({ response }))
  .catch(error => ({ error }))
}

function* loadHistorySaga(action) {
  // Do not load history if something is here
  const currentMessages = yield select(state => state.messages[`${action.payload.teamId}#${action.payload.id}`])
  if (currentMessages) { return }

  // set in progress
  yield put({ type: 'updateChannel', payload: { ...action.payload, status: 'inProgress' } })

  const { response, error } = yield call(fetchChannelHistory, action.payload)
  if (response) {
    const joinRegExp = /^<(.*?)>\s[has joined the channel|has left the channel]?/
    const messages = response.messages.filter(msg => !joinRegExp.test(msg.text)).map((msg) => {
      return new MessageObject({
        id: msg.ts,
        senderId: msg.user,
        channelId: action.payload.id,
        teamId: action.payload.teamId,
        text: msg.text,
        createdAt: msg.ts * 1000,
        state: 'recived',
      })
    })

    if (messages.length > 0) {
      yield put({ type: 'addMessages', payload: messages })
    }

    yield put({ type: 'updateChannel', payload: { ...action.payload, status: 'online' } })
  } else {
    yield put({ type: 'loadHistoryFailed', error })
    yield put({ type: 'updateChannel', payload: { ...action.payload, status: 'error' } })
  }
}

function* persistTheTeamSaga() {
  try {
    const teamLoader = new TeamLoader()
    teamLoader.persist()
    yield put({ type: 'teamWasPersisted', payload: 'done' })
  } catch (e) {
    console.log(e)
    yield put({ type: 'status', payload: 'error' })
  }
}

function* loadChannelHistory() {
  yield* takeEvery('setActiveChannel', loadHistorySaga);
}

function* persistTheTeam() {
  yield* takeEvery('addNewTeam', persistTheTeamSaga);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    loadChannelHistory(),
    persistTheTeam(),
  ]
}
