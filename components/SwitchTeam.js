'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import { setCurrentTeam } from '../actions'
import classNames from 'classnames'

class SwitchTeam extends Component {
  render() {
    const { team, dispatch } = this.props

    return (
      <li key={team.id} onClick={(e) => dispatch(setCurrentTeam(team.id))} className={classNames({ active: team.active })}>
        <img src={team.icon} alt={team.name} />
        ⌘{team.id}
      </li>
    )
  }
}

export default connect()(SwitchTeam)
