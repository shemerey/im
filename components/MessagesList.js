'use babel'

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import _ from 'underscore-plus'
import Message from './Message'
import SlackMessage from './SlackMessage'
import colors from './colors'

// Style
import styled from 'styled-components'
const MessagesListElement = styled.div`
flex: 1;
padding-bottom: 10px;
overflow-y: scroll;
background-color: ${colors.appBackground};

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80vh;

  h1 {
    color: rgba(157, 165, 180, 0.2);
    font-size: 36px;
    font-weight: bold;
    font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu, Cantarell, sans-serif;
  }
}
`

class MessagesList extends Component {

  list() {
    const { messages, users } = this.props

    if (!messages || messages.length === 0) {
      return this.emptyList()
    }

    let first = {}
    let odd = true
    return messages.map((msg, index) => {
      if (first.senderId !== msg.senderId) { first = msg; odd = !odd }
      return <SlackMessage key={index} {...msg} first={msg === first} odd={odd} user={users[msg.senderId]} />
    })
  }

  emptyList() {
    return (
      <div className="empty">
        <h1>You are going to be the first.</h1>
      </div>
    )
  }

  render() {
    return (
      <MessagesListElement>
        {this.list()}
      </MessagesListElement>
    )
  }
}

function mapStateToProps(state) {
  const currentTeam = state.currentTeam
  const currentChannel = state.activeChannels[currentTeam.id]
  const messages = _.sortBy(_.values(state.messages[`${currentTeam.id}#${currentChannel.id}`] || {}), 'id')
  const users = state.users[state.currentTeam.id] || {}

  return {
    currentTeam,
    currentChannel,
    messages,
    users,
  }
}

export default connect(mapStateToProps)(MessagesList)
