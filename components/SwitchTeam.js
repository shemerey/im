'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import { setCurrentTeam } from '../lib/actions'
import classNames from 'classnames'

class SwitchTeam extends Component {
  render() {
    const { team, dispatch, currentTeam, order } = this.props
    const active = (team.id == currentTeam.id)

    return (
      <li key={team.id} onClick={(e) => dispatch(setCurrentTeam(team))} className={classNames({ active })}>
        <img src={team.icon} alt={team.name} />
        ⌘{order + 1}
      </li>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentTeam: state.currentTeam
  }
}

export default connect(mapStateToProps)(SwitchTeam)
