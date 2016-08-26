'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import Message from './Message'

class MessagesList extends Component {
  render() {
    const { messages } = this.props

    return (
      <div className="messages-view">
       {messages.map((msg, index) => {
          return <Message key={index} {...msg}/>
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages[`${state.currentTeam}${state.currentChannel}`]
  }
}

export default connect(mapStateToProps)(MessagesList)
