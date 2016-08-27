'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import { setCurrentTeam } from '../actions'
import classNames from 'classnames'

class SwitchTeam extends Component {
  render() {
    const { team, dispatch, currentTeam } = this.props
    const active = (team.id == currentTeam)

    return (
      <li key={team.id} onClick={(e) => dispatch(setCurrentTeam(team.id))} className={classNames({ active })}>
        <img src={team.icon} alt={team.name} />
        ⌘{team.id}
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
