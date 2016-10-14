'use babel'

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import Loader from './Loader'
import TopBar from './TopBar'
import MessagesList from './MessagesList'
import MasterInput from './MasterInput'

// Style
import colors from './colors'
import styled from 'styled-components'
const ImMainWrapper = styled.section`
  height: 100vh;
  display: flex;
  min-width: 100%;
  flex-direction: column;
  background-color: ${colors.baseBackground};
`

class Main extends Component {
  static
  get propTypes() {
    return {
      currentTeam: PropTypes.object,
    }
  }

  render() {
    if (this.props.currentTeam.status === 'new') {
      return <Loader />
    }

    return (
      <ImMainWrapper>
        <TopBar />
        <MessagesList />
        <MasterInput />
      </ImMainWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentTeam: state.currentTeam,
  }
}

export default connect(mapStateToProps)(Main)
