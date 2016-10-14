'use babel'

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import Loader from './Loader'
import TopBar from './TopBar'
import MessagesList from './MessagesList'
import MasterInput from './MasterInput'

// Style
import styled from 'styled-components'
const ImMainWrapper = styled.div`
flex: 1;
height: 100vh;
display: flex;
flex-direction: column;
background-color: @base-background-color;
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
