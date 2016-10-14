'use babel'

import React, { PropTypes, Component } from 'react'
import { FormattedTime } from 'react-intl'
import { MessageSentIcon, MessageRecivedIcon, DotsIcon } from './Icons'
import classNames from 'classnames'
import { messageTs } from '../lib/utils'

export default class SlackMessage extends Component {

  render() {
    const { text, createdAt, user, first, last, odd } = this.props

    return (
      <div className={classNames('slack-message', {first, last, odd, even: !odd})}>
        <div className="gutter">
          <span className="avatar">
            <img src={user.avatar} />
          </span>
          <span className="ts">{messageTs(createdAt)}</span>
        </div>
        <div className="content">
          <span className="username">@{user.username}</span>
          <span className="ts">{messageTs(createdAt)}</span>
          <span className="body">{text}</span>
        </div>
      </div>
    )
  }
}
