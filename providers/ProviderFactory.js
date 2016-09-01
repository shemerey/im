'use babel'

import IRC from './IRC'
import XMPP from './XMPP'

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
    this.listOfAvaliableProvides = {
      IRC,
      XMPP,
    }

    this.listToConnect = []
    return instance
  }

  getAllTeams() {
    return this.teams
  }

  // instantiate all teams
  perform() {
    this.teams = this.listToConnect.map((options) => {
      const team = new this.listOfAvaliableProvides[options.type](this.store, options)
      this.store.dispatch(addTeam(team))
      return team
    })
  }
}
