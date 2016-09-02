'use babel'

import IRC from './IRC'
import XMPP from './XMPP'

import _ from 'underscore-plus'
import CSON from 'season'
import fs from 'fs-plus'
import path from 'path'

import { addTeam } from '../actions'

let instance = null
export default class ProviderFactory {
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
          reject('no teams here')
        }
      })
    })
  }
}
