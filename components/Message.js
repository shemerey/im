'use babel'

import React, { PropTypes, Component } from 'react'
import { FormattedTime } from 'react-intl'
import { MessageSentIcon, MessageRecivedIcon, DotsIcon } from './Icons'
import classNames from 'classnames'
import { messageTs } from '../lib/utils'

export default class Message extends Component {
  static
  get propTypes() {
    return {
      state: PropTypes.string,
      text: PropTypes.string,
      createdAt: PropTypes.number,
      first: PropTypes.boolean,
      dispatch: PropTypes.function,
      user: PropTypes.object,
    }
  }

  messageOptions() {
    const { state } = this.props

    if (state === 'new') {
      return <MessageSentIcon />
    }

    if (state === 'sent') {
      return <MessageRecivedIcon />
    }

    return <DotsIcon />
  }

  render() {
    const { text, createdAt, user, first } = this.props

    return (
      <div className={classNames('im-message', { first })}>
        <div className="gutter">
          <span className="username">@{user.username} </span>
          <span className="ts">{messageTs(createdAt)}</span>
        </div>
        <div className="content">
          <span>{text}</span>
          <span className="actions">{this.messageOptions()}</span>
        </div>
      </div>
    )
  }
}
