'use babel'

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import _ from 'underscore-plus'
import Message from './Message'

class MessagesList extends Component {
  render() {
    const { messages, users } = this.props

    if (!messages || messages.length === 0) {
      return <div className="messages-view">
                <div className="empty">
                  <h1>You are going to be the first.</h1>
                </div>
              </div>
    }

    let first = {}
    let odd = true
    return (
      <div className="messages-view">
        {messages.map((msg, index) => {
          if (first.senderId !== msg.senderId) { first = msg; odd = !odd }
          return <Message key={index} {...msg} first={msg === first} odd={odd} user={users[msg.senderId]} />
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const currentTeam = state.currentTeam
  const currentChannel = state.activeChannels[currentTeam.id]
  const messages = _.sortBy(_.values(state.messages[`${currentTeam.id}#${currentChannel.id}`] || {}), 'id')
  const users = state.users[state.currentTeam.id]
  debugger

  return {
    currentTeam,
    currentChannel,
    messages,
    users,
  }
}

export default connect(mapStateToProps)(MessagesList)
