'use babel'

import React, { Component, PropTypes } from 'react'
import ReactEmoji from 'react-emoji'

import SlackUserTag from './SlackUserTag'

const SlackChannelTag = (props) => {
  const id = props.id.replace(/^#/, '')
  const name = props.name || id
  const options = {
    href: props.id,
    className: 'mention',
  }

  return React.createElement('a', options, `#${name}`)
}

SlackChannelTag.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
}

const SlackAlertTag = (props) => {
  const id = props.id.replace(/^!/, '')
  const name = props.name || id
  const options = {
    href: props.id,
    className: 'mention',
  }

  return React.createElement('a', options, `${name}`)
}

SlackAlertTag.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
}

const SlackLinkTag = (props) => {
  const id = props.id
  const name = props.name || id
  const options = {
    target: '_blank',
    href: props.id,
  }

  return React.createElement('a', options, name)
}

SlackLinkTag.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
}

export default class ParsedMessage extends Component {
  static
  get propTypes() {
    return {
      text: PropTypes.string,
    }
  }

  parseLiline(text) {
    return text.split(/(<.*?>)/g).map((word) => {
      // Replce with channel tag
      if (word.indexOf('<!') === 0) {
        const [id, name] = word.split(/<(.*)>/)[1].split('|')
        return <SlackAlertTag id={id} name={name} />
      }

      // Replce with channel tag
      if (word.indexOf('<#') === 0) {
        const [id, name] = word.split(/<(.*)>/)[1].split('|')
        return <SlackChannelTag id={id} name={name} />
      }

      // Replce with user tag
      if (word.indexOf('<@') === 0) {
        const [id, name] = word.split(/<(.*)>/)[1].split('|')
        return <SlackUserTag id={id} name={name} />
      }

      // Replce with link tag
      if (word.indexOf('<http') === 0) {
        const [id, name] = word.split(/<(.*)>/)[1].split('|')
        return <SlackLinkTag id={id} name={name} />
      }

      // return by default
      return ReactEmoji.emojify(word)
    })
  }

  render() {
    const { text } = this.props
    const lines = text.split('\n').map((line, index) => {
      return (
        <span key={index}>
          {::this.parseLiline(line)}<br />
        </span>
      )
    })

    return <span>{lines}</span>
  }
}
