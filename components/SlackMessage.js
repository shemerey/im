'use babel'

import React, { PropTypes, Component } from 'react'
import { FormattedTime } from 'react-intl'
import { MessageSentIcon, MessageRecivedIcon, DotsIcon } from './Icons'
import classNames from 'classnames'
import { messageTs } from '../lib/utils'

export default class SlackMessage extends Component {
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

  render() {
    const { text, createdAt, user, first } = this.props

    return (
      <div className={classNames('slack-message', { first })}>
        <div className="gutter">
          <span className="avatar">
            <img role="presentation" src={user.avatar} />
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
