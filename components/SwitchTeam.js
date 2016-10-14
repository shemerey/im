'use babel'

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentTeam } from '../lib/actions'
import classNames from 'classnames'
import Loader from './Loader'

// Style
import styled from 'styled-components'
import colors from './colors'
const TeamElement = styled.div`
  margin: 8px 5px;

  &.active::before {
    content: '';
    width: 10px;
    margin-left: -17px;
    margin-top: 4px;
    height: 26px;
    background-color: ${colors.textHighlight};
    border-radius: 3px;
    float: left;
  }

  img {
    display: block;
    border-radius: 3px;
    width: 32px;
    height: 32px;

    &:hover {
      border: 2px solid ${colors.textHighlight};
      box-sizing: border-box;
    }
  }
`

const TeamLogoElement = styled.div`
`

class TeamLogo extends Component {
  render() {
    const { team } = this.props

    if (team.icon) {
      return <img src={team.icon} alt={team.name} />
    }

    return <Loader size={32} />
  }
}

class SwitchTeam extends Component {
  static
  get propTypes() {
    return {
      team: PropTypes.object,
      order: PropTypes.number,
      dispatch: PropTypes.function,
      currentTeam: PropTypes.object,
    }
  }

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
      <TeamElement key={team.id} onClick={(e) => ::this.selectThisTeam()} className={classNames({ active })}>
        <TeamLogo team={team}/>
        ⌘{order + 1}
      </TeamElement>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentTeam: state.currentTeam
  }
}

export default connect(mapStateToProps)(SwitchTeam)
