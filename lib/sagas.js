'use babel'

import { takeEvery } from 'redux-saga'
import { call, put, select, take } from 'redux-saga/effects'

import TeamLoader from './TeamLoader'
import MessageObject from './MessageObject'

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

function notfifyIfNeeded({ currentUser, sender, message }) {
  message.text.split(/(<.*?>)/g).forEach((word) => {
    if (word.indexOf('<!') === 0) {
      const [id, name] = word.split(/<(.*)>/)[1].replace(/^!/, '').split('|')
      window.atom.notifications.addInfo(
        `User @${sender.username}: send #${name || id} message`,
        {
          description: message.text,
        }
      )
    }

    if (word.indexOf('<@') === 0) {
      const id = word.split(/<(.*)>/)[1].replace(/^@/, '').split('|')[0]
      if (id === currentUser.id) {
        window.atom.notifications.addInfo(
          `User @${sender.username}: mention you.`,
          {
            description: message.text,
          }
        )
      }
    }
  })
}

function* notifyOnMessage() {
  while (true) {
    const action = yield take('reciveMessage')

    const message = action.payload
    const currentUser = yield select(state => state.users[state.currentTeam.id][state.currentTeam.userId])
    const sender = yield select(state => state.users[state.currentTeam.id][message.senderId])

    if (message.senderId === currentUser.id) {
      return
    }

    notfifyIfNeeded({ currentUser, sender, message })
  }
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    loadChannelHistory(),
    persistTheTeam(),
    notifyOnMessage(),
  ]
}
