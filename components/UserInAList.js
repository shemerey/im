'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { OnlineIcon, OfflineIcon, DoNotDisturbIcon } from './Icons'

import { setCurrentChannel } from '../actions'

class UserInAList extends Component {
  render() {
    const { name, id } = this.props

    return <li><OnlineIcon /> {name}</li>
  }
}

function mapStateToProps(state) {
  return {
    currentChannel: state.currentChannel
  }
}

export default connect(mapStateToProps)(UserInAList)
/*


<li><OfflineIcon /> random</li>
<li><DoNotDisturbIcon /> RebelIcons</li>
<li><OfflineIcon /> HaKaTon</li>

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { setCurrentChannel } from '../actions'

class Channel extends Component {
  setThisChannelAsCurrent() {
    const { dispatch, name } = this.props
    dispatch(setCurrentChannel(name))
  }

  render() {
    const { name, active, currentChannel } = this.props

    return (
      <li
        onClick={(e) => { ::this.setThisChannelAsCurrent() }}
        className={classNames({ active: name === currentChannel})}
        >
        # {name.replace(/^#/,'')}
      </li>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentChannel: state.currentChannel
  }
}

export default connect(mapStateToProps)(Channel)

*/
