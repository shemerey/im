'use babel'

import IrcProvider from './IrcProvider'

export default class ProviderFactory {
  constructor(store) {
    this.store = store
    this.listOfAvaliableProvides = {
      IrcProvider,
    }

    this.listToConnect = [
      {
        id: 1,
        name: 'Irc',
        type: 'IrcProvider',
        icon: 'https://lh3.googleusercontent.com/ul6H_gVyLQ8for0vMtG-J6DoLE_IKMfI9iKcFGjZRnEJL1kE2W36YH-YupoM7TOZbObq=w200',
        server: 'irc-uk1.alphachat.net',
        username: 'SheMereY22',
        channels: ['#TestChennalHere'],
      }
    ]
  }

  // instantiate all provides
  perform() {
    this.listToConnect.map( options => new this.listOfAvaliableProvides[options.type](this.store, options))
  }
}
