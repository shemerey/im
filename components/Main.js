'use babel'

import React, {PropTypes, Component} from 'react'

import TopBar from './TopBar'
import MessagesList from './MessagesList'
import MasterInput from './MasterInput'

export default class Main extends Component {
  render() {
    return (
      <div className="im-main">
        <TopBar />
        <MessagesList />
        <MasterInput />
      </div>
    )
  }
}
