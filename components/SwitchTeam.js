'use babel'

import React, {PropTypes, Component} from 'react'

export default class SwitchTeam extends Component {
  render() {
    const { team } = this.props

    return (
      <li key={team.id}>
        <img src={team.img} alt={team.name} />
        ⌘{team.id}
      </li>
    )
  }
}
