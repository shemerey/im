'use babel'

import { findDOMNode } from 'react-dom'
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import _ from 'underscore-plus'
import SlackMessage from './SlackMessage'
import colors from './colors'

// Style
import styled from 'styled-components'
const MessagesListElement = styled.div`
flex: 1;
padding-bottom: 10px;
overflow-y: scroll;
background-color: ${colors.appBackground};

.mention {
  background-color: rgb(87, 81, 68);
  border-radius: 3px;
  padding: 0 3px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

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
  static
  get propTypes() {
    return {
      currentTeam: PropTypes.object,
      messages: PropTypes.array,
      users: PropTypes.array,
    }
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentWillUpdate() {
    const node = findDOMNode(this.msgListRef)
    const { scrollHeight, clientHeight, scrollTop } = node
    const buffer = 120
    this.pinToBottom = clientHeight + scrollTop + buffer >= scrollHeight
  }

  componentDidUpdate() {
    const { currentTeam, messages } = this.props
    // When we send the message
    if (
        messages.length > 0 &&
        messages[messages.length - 1].senderId === currentTeam.userId
      ) {
      this.scrollToBottom()
    }

    // Scroll if we at the end of the list
    if (this.pinToBottom) {
      this.scrollToBottom()
    }
  }

  scrollToBottom() {
    const node = findDOMNode(this.msgListRef)
    node.scrollTop = node.scrollHeight
  }

  list() {
    const { messages, users } = this.props

    if (!messages || messages.length === 0) {
      return this.emptyList()
    }

    let first = {}
    let odd = true
    return messages.map((msg, index) => {
      if (first.senderId !== msg.senderId) { first = msg; odd = !odd }
      return <SlackMessage key={index} first={msg === first} odd={odd} user={users[msg.senderId]} message={msg} />
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
      <MessagesListElement ref={(ref) => { this.msgListRef = ref }}>
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
