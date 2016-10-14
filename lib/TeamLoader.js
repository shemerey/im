'use babel'

import fs from 'fs-plus'
import path from 'path'

import Slack from './Slack'
import TeamObject from './TeamObject'
import { addNewTeam } from './actions'

let instance = null
export default class TeamLoader {
  constructor({ store } = {}) {
    if (instance) {
      return instance
    }

    instance = this

    this.teams = []
    this.store = store

    return instance
  }

  getFilePath(filename = 'myslack.json') {
    const dir = atom.getConfigDirPath()
    return path.join(dir, filename)
  }

  getTeamsConfigs() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.getFilePath(), (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(data));
        }
      })
    })
  }

  getAllTeams() {
    return this.teams
  }

  find(teamId) {
    return this.teams.find((t) => t.id === teamId)
  }

  perform() {
    this.getTeamsConfigs().then((listOfTeamConfigs) => {
      listOfTeamConfigs.forEach((options) => {
        const teamConnection = new Slack(options)
        const teamObject = new TeamObject(teamConnection.serialize())
        this.store.dispatch(addNewTeam(teamObject))
        this.teams.push(teamConnection)
        teamConnection.connect()
      })
    }).catch((err) => {
      console.error(err)
    })
  }
}
