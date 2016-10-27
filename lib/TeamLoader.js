'use babel'

import fs from 'fs-plus'
import path from 'path'
import _ from 'underscore-plus'

import Slack from './Slack'
import { setStatus } from './redux/modules/status'

let instance = null
export default class TeamLoader {
  constructor({ store } = {}) {
    if (instance) {
      return instance
    }

    instance = this

    this.teams = {}
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
    return _.values(this.teams)
  }

  find(teamId) {
    return this.getAllTeams().find(t => t.id === teamId)
  }

  connect(options) {
    const teamConnection = new Slack(options)
    this.teams[teamConnection.accessToken] = teamConnection
    teamConnection.connect()
  }

  persist() {
    fs.writeFileSync(
      this.getFilePath(),
      JSON.stringify(this.getAllTeams().map(con => con.serialize())),
      'utf-8'
    )
  }

  perform() {
    if (!fs.existsSync(this.getFilePath())) {
      this.store.dispatch(setStatus('empty'))
      return
    }

    this.getTeamsConfigs().then((listOfTeamConfigs) => {
      listOfTeamConfigs.forEach((options) => {
        this.connect(options)
      })
    }).catch((err) => {
      console.error(err)
    })
  }
}
