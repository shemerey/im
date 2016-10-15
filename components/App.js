'use babel'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import SideBar from './SideBar'
import Main from './Main'
import Loader from './Loader'
import WelcomeScreen from './WelcomeScreen'

// Style Section
import styled, { keyframes } from 'styled-components'
import colors from './colors'
const fadein = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const AppWrapper = styled.div`
  height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: row;
  background-color: ${colors.background};
  animation: ${fadein} 0.3s;
`

const CenteredWrapper = styled.section`
  height: 100vh;
  display: flex;
  min-width: 100%;
  align-items: center;
  justify-content: center;
`

class App extends Component {
  static
  get propTypes() {
    return {
      teams: PropTypes.array,
      status: PropTypes.string,
      currentTeam: PropTypes.object,
    }
  }

  render() {
    const { status, teams, currentTeam } = this.props

    if (status !== 'ready') {
      // return loader by default
      return (
        <CenteredWrapper>
          <WelcomeScreen />
        </CenteredWrapper>
      )
    }

    if (teams.length > 0 && currentTeam) {
      return (
        <AppWrapper>
          <SideBar />
          <Main />
        </AppWrapper>
      )
    }

    // return loader by default
    return (
      <CenteredWrapper>
        <Loader />
      </CenteredWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    status: state.status,
    teams: state.teams,
    currentTeam: state.currentTeam,
  }
}

export default connect(mapStateToProps)(App)
