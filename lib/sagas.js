'use babel'

import { takeEvery } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import TeamLoader from './TeamLoader'
import MessageObject from './MessageObject'

function fetchChannelHistory(channel) {
  return (new TeamLoader()).find(channel.teamId).history(channel.id)
  .then(response => ({ response }))
  .catch(error => ({ error }))
}

function* loadHistorySaga(action) {
  // Do not load history if something is here
  const currentMessages = yield select(state => state.messages[`${action.payload.teamId}#${action.payload.id}`])
  if (currentMessages) { return }

  const { response, error } = yield call(fetchChannelHistory, action.payload)
  if (response) {
    const messages = response.messages.map((msg) => {
      return new MessageObject({
        id: msg.ts,
        senderId: msg.user,
        channelId: action.payload.id,
        teamId: action.payload.teamId,
        text: msg.text,
        createdAt: Date(msg.ts),
        state: 'recived',
      })
    })

    yield put({ type: 'addMessages', payload: messages })
  } else {
    yield put({ type: 'loadHistoryFailed', error })
  }
}

function* loadChannelHistory() {
  yield* takeEvery('setActiveChannel', loadHistorySaga);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    loadChannelHistory(),
  ]
}
