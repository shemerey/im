import ReactDOM from 'react-dom'
import React from 'react'
import style from '../styles/im.less'

class App extends React.Component {
  render() {
    return <h1>Hi there, I am an app</h1>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
