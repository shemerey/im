'use babel'

import React, { PropTypes, Component } from 'react'
import { TeamObject } from '../lib/objects'
import Loader from './Loader'

export default class TeamLogo extends Component {
  static propTypes = {
    team: PropTypes.instanceOf(TeamObject),
  }

  render() {
    const { team } = this.props

    if (team.icon) {
      return <img src={team.icon} alt={team.name} />
    }

    return <Loader size={32} />
  }
}
