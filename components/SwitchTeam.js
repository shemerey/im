'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import { setCurrentTeam } from '../lib/actions'
import classNames from 'classnames'

class SwitchTeam extends Component {
  selectThisTeam() {
    const { team, dispatch } = this.props
    dispatch(setCurrentTeam(team))

    // Focus input after team switch
    setTimeout(() => {
      let el
      if (el = window.document.querySelector('.im-editor')) {
        el.focus()
      }
    }, 0)
  }

  render() {
    const { team, dispatch, currentTeam, order } = this.props
    const active = (team.id == currentTeam.id)

    return (
      <li key={team.id} onClick={(e) => ::this.selectThisTeam()} className={classNames({ active })}>
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
