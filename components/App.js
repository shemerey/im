'use babel'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'

import SideBar from './SideBar'
import Main from './Main'
import Loader from './Loader'

// keyframes animations
const fadein = keyframes`
      from { opacity: 0; }
      to   { opacity: 1; }
`

const AppElement = styled.div`
flex: 1;
height: 100vh;
display: flex;
flex-direction: column;
background-color: @base-background-color;
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
        <AppElement>
          <SideBar />
          <Main />
        </AppElement>
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
