'use babel'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import SideBar from './SideBar'
import Main from './Main'
import Loader from './Loader'

// Style Section
import styled, { keyframes } from 'styled-components'
import colors from './colors'
const fadein = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const AppWrapper = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colors.background};
  display: flex;
  animation: ${fadein} 0.3s;
`

class App extends Component {
  static
  get propTypes() {
    return {
      teams: PropTypes.array,
      currentTeam: PropTypes.object,
    }
  }

  render() {
    const { teams, currentTeam } = this.props

    if (teams.length > 0 && currentTeam) {
      return (
        <AppWrapper>
          <SideBar />
          <Main />
        </AppWrapper>
      )
    }

    // return loader by default
    return <Loader />
  }
}

function mapStateToProps(state) {
  return {
    teams: state.teams,
    currentTeam: state.currentTeam,
  }
}

export default connect(mapStateToProps)(App)
