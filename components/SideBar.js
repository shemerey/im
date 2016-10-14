'use babel'

import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import SwitchTeam from './SwitchTeam'
import CurrentUserInfo from './CurrentUserInfo'
import ChannelsList from './ChannelsList'
import UsersList from './UsersList'
import Loader from './Loader'

// Style
import styled from 'styled-components'
const TeamsWrapepr = styled.div`
min-height: 100vh;
padding: 5px;
border-right: 1px solid @base-border-color;
color: @text-color-subtle;
text-align: center;
display: flex;
flex-direction: column;

li {
  margin: @top-margin + 2px 5px;

  &.active::before {
    content: '';
    width: 10px;
    margin-left: -17px;
    margin-top: 4px;
    height: @team-icon-size - 8px;
    background-color: @text-color-highlight;
    border-radius: 3px;
    float: left;
  }


  img {
    display: block;
    border-radius: 3px;
    width: @team-icon-size;
    height: @team-icon-size;

    &:hover {
      border: 2px solid @text-color-highlight;
      box-sizing: border-box;
    }
  }
}
`

const TeamDetails = styled.div`
background-color: @base-background-color;
border-right: 1px solid @base-border-color;
font-size: 14px;
min-width: 240px;
max-width: 240px;
overflow-x: hidden;
display: block;

.counter {
  color: #6F6D6D;
  font-weight: lighter;
}

.direct-messages, .channels {
  color: @text-color-subtle;

  .active {
    background-color: @background-color-highlight;
  }

  .unread {
    color: @text-color-selected;
    font-weight: bold;
  }

  h3 {
    margin: 20px 16px 5px 16px;
    text-transform: uppercase;
    font-size: 14px;
    color: @text-color-subtle;
    small {
      font-size: 12px;
    }
  }
}
`

const SideBarElement = styled.div`
display: flex;
justify-content: flex-start;
`

class SideBar extends Component {

  teamsBar() {
    const { teams } = this.props

    return (
      <TeamsWrapepr>
        {teams.map((team, index) => <SwitchTeam key={team.id} order={index} team={team} />)}
      </TeamsWrapepr>
    )
  }

  currentTeamChannelsBar() {
    if (this.props.currentTeam.status === 'new') {
      return <Loader/>
    }

    return (
      <TeamDetails>
        <CurrentUserInfo />
        <ChannelsList />
        <UsersList />
      </TeamDetails>
    )
  }

  render() {
    return (
      <SideBarElement>
        {this.teamsBar()}
        {this.currentTeamChannelsBar()}
      </SideBarElement>
    )
  }
}

function mapStateToProps(state) {
  return {
    teams: state.teams,
    currentTeam: state.currentTeam,
  }
}

export default connect(mapStateToProps)(SideBar)
