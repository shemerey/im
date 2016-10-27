'use babel'

import { takeEvery } from 'redux-saga'
import { call, put, select  } from 'redux-saga/effects'

import TeamLoader from '../../TeamLoader'
import MessageObject from '../../MessageObject'

function fetchChannelHistory(channel) {
  return (new TeamLoader()).find(channel.teamId).history(channel)
  .then(response => ({ response }))
  .catch(error => ({ error }))
}

function markChannelAsRead(channel) {
  return (new TeamLoader()).find(channel.teamId).mark(channel)
  .then(response => ({ response }))
  .catch(error => ({ error }))
}

function* loadHistorySaga(action) {
  // Do not load history if something is here
  const channel = action.payload
  const currentMessages = yield select(state => state.messages[`${channel.teamId}#${channel.id}`])

  // mark channel as read
  if (currentMessages) {
    yield call(markChannelAsRead, channel)
    return
  } else {
    // set in progress & mark as read
    yield put({ type: 'updateChannel', payload: { ...channel, status: 'inProgress' } })
    yield call(markChannelAsRead, channel)
  }

  const { response, error } = yield call(fetchChannelHistory, channel)
  if (response) {
    const joinRegExp = /^<(.*?)>\s[has joined the channel|has left the channel]?/
    const messages = response.messages.filter(msg => !joinRegExp.test(msg.text)).map((msg) => {
      return new MessageObject({
        id: msg.ts,
        senderId: msg.user,
        channelId: channel.id,
        teamId: channel.teamId,
        text: msg.text,
        createdAt: msg.ts * 1000,
        state: 'recived',
      })
    })

    if (messages.length > 0) {
      yield put({ type: 'addMessages', payload: messages })
    }

    yield put({ type: 'updateChannel', payload: { ...channel, status: 'online' } })
  } else {
    yield put({ type: 'loadHistoryFailed', error })
    yield put({ type: 'updateChannel', payload: { ...channel, status: 'error' } })
  }
}

export default function* loadChannelHistory() {
  yield* takeEvery('setActiveChannel', loadHistorySaga);
}
