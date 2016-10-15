'use babel'

import React, { PropTypes, Component } from 'react'
import { FormattedTime } from 'react-intl'
import { MessageSentIcon, MessageRecivedIcon, DotsIcon } from './Icons'
import classNames from 'classnames'
import { messageTs } from '../lib/utils'
import colors from './colors'

// Style
import styled from 'styled-components'
const MessageElement = styled.div`
font-size: 14px;
display: flex;
justify-content: flex-start;

.gutter, .content {
  margin-top: -7px;
  margin-bottom: 10px;
}

&.first {
  padding-top: 13px;
  &:not(:first-of-type) {
    border-top: 1px solid ${colors.baseBorder};
  }
}

&:last-of-type {
  border-bottom: 1px solid ${colors.baseBorder};
}

.username {
  display: none;
  color: ${colors.textSubtle};
  font-weight: bold;
  margin-right: 10px;
}

.ts {
  display: none;
  font-weight: lighter;
  color: ${colors.textSubtle};
  margin-right: 10px;
}

&.first .username {
  display: inline-block;
}

.gutter {
  width: 140px;
  display: flex;
  justify-content: flex-end;

  a {
    color: ${colors.textSubtle};
    margin-right: 5px;
  }
}

.content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  :last-child {
    margin-right: 9px;
    height: 18px;
    width: 18px;
  }

  .actions {
    min-width: 30px;
  }
}

&:hover {
  .options {
    display: inline-block;
  }
  &:not(.first) .ts {
    display: inline-block;
  }
}

.options, .ts {
  display: none;
}
`

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
    const { text, createdAt, user, odd, first } = this.props

    return (
      <MessageElement className={classNames({ first, odd, even: !odd })}>
        <div className="gutter">
          <span className="username">@{user.username} </span>
          <span className="ts">{messageTs(createdAt)}</span>
        </div>
        <div className="content">
          <span>{text}</span>
          <span className="actions">{this.messageOptions()}</span>
        </div>
      </MessageElement>
    )
  }
}
