'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import Message from './Message'

class MessagesList extends Component {
  render() {
    const { messages } = this.props

    return (
      <div className="messages-view">
       {messages.map((msg) => {
          return <Message key={msg.id} {...msg}/>
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  // let currentTeam = state.teams.filter(t => t.active)
  // let messages  = state[1]
  //
  // // FIXME: just remove this function START
  // messages = messages.sort(function(a, b) {
  //   let nameA = a.created_at.toUpperCase()
  //   let nameB = b.created_at.toUpperCase()
  //
  //   if (nameA < nameB) {
  //     return -1
  //   }
  //
  //   if (nameA > nameB) {
  //     return 1
  //   }
  //
  //   return 0
  // })
  // FIXME: just remove this function END
  const messages = []

  return {
    messages: messages
  }
}

export default connect(mapStateToProps)(MessagesList)
