'use babel'

import React, {PropTypes, Component} from 'react'

export default class DirectMessages extends Component {
  render() {
    // const { team } = this.props

    return (
      <ul className="direct-messages">
        <li>#general</li>
        <li>#random</li>
        <li>#RebelIcons</li>
        <li>#HaKaTon</li>
      </ul>
    )
  }
}
