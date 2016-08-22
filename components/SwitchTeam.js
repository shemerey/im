'use babel'

import React, {PropTypes, Component} from 'react'
import classNames from 'classnames'

export default class SwitchTeam extends Component {
  render() {
    const { team } = this.props

    return (
      <li key={team.id} className={classNames({ active: team.active })}>
        <img src={team.img} alt={team.name} />
        ⌘{team.id}
      </li>
    )
  }
}
