'use babel'

import React, { PropTypes, Component } from 'react'
import { FormattedTime } from 'react-intl'
import classNames from 'classnames'
import { messageTs } from '../lib/utils'

// Style
import styled from 'styled-components'
import colors from './colors'
const SlackMessageElement = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 4px;
  margin-top: -4px;

  .gutter {
    min-width: 65px;
    margin-right: 10px;
    display: flex;
    justify-content: flex-end;

    .avatar {
      min-height: 45px;
      display: none;
      img {
        width: 36px;
        height: 36px;
        opacity: 0.7;
        border: 1px solid #545454;
        border-radius: 3px;
      }
    }

    .ts {
      display: none;
      color: rgb(105, 110, 119);
    }
  }

  &:hover {
    &:not(.first) .gutter {
      .ts {
        display: inline-block;
      }
    }
  }

  &.odd {
    background-color: ${colors.appBackground};
  }

  &.even {
    background-color: ${colors.bgHighlight};
  }

  &.first {
    margin-top: 4px;
    padding-bottom: 0px;

    .gutter {
      .avatar {
        display: inline;
        padding-top: 5px;
      }
    }

    .content {
      .username, .ts {
        display: inline;
      }
    }
  }

  .content {
    .username, .ts {
      display: none;
      margin-right: 4px;
      color: rgb(105, 110, 119);
    }

    .username:hover, .ts:hover {
      color: ${colors.textSubtle};
      text-decoration: underline;
    }

    .body {
      display: block;
    }
  }
`

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
    const { text, createdAt, user, odd, first } = this.props

    return (
      <SlackMessageElement className={classNames({ first, odd, even: !odd })}>
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
      </SlackMessageElement>
    )
  }
}
