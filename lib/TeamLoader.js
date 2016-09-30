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
    return []
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

      // const team = new Slack(options)
      // team.connect()
      // this.teams[team.id] = team
      // teamsToStore.push(team.serialize())
      // this.store.dispatch(setAllTeams(teamsToStore))
      // this.store.dispatch(setCurrentTeam(teamsToStore[0]))
      // this.store.dispatch(imIsReadyAction())

    }).catch((err) => {
      console.error(err)
      // this.store.dispatch(displayError(err))
    })
  }
}

/*

import IRC from './IRC'
import XMPP from './XMPP'

import _ from 'underscore-plus'
import CSON from 'season'
import fs from 'fs-plus'
import path from 'path'

import { addTeam } from '../actions'

let instance = null
export default class TeamLoader {
  constructor({ store } = {}) {
    if (!instance) {
      instance = this
    } else {
      return instance
    }

    this.teams = []
    this.store = store
    this.listOfProvides = {
      IRC,
      XMPP,
    }

    this.listToConnect = []
    return instance
  }

  getFile () {
    const filename = 'ims.cson'
    const dir = atom.getConfigDirPath()

    return path.join(dir, filename)
  }

  readFile () {
    const filename = this.getFile()
    return new Promise((resolve, reject) => {
      fs.exists(filename, (exists) => {
        if (!exists) return resolve({})

        CSON.readFile(filename, (err, result = {}) => {
          if (err) return reject(err)
          return resolve(result)
        })
      })
    })
  }


  getAllTeams() {
    return this.teams
  }

  // instantiate all teams
  perform() {
    return new Promise((resolve, reject) => {

      this.readFile().then((items) => {
        let id = 1
        _.each(items, (config, name) => {
          try {
            const team =  new this.listOfProvides[config.type]({store: this.store, id, name, ...config})
            this.teams.push(team)
            this.store.dispatch(addTeam(team))
            id++
          } catch (e) {
            reject(e)
          }
        })

        if (this.teams.length > 0) {
          resolve(this.temas)
        } else {
          reject(new Error('No Teams Here'))
        }
      })
    })
  }
}

*/
