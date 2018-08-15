import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Cookie from 'js-cookie'

import { Encoder, Uploader } from './components'
import './App.scss'

console.log(`Uid is ${Cookie('_uid')}`)

class App extends Component {

  initialState = {
    encoder: false,
    uploader: true,
    file: '',
    convert_ext: '',
  }

  state = this.initialState

  initEncoding = (file, extension) => {
    this.setState({ encoder: true, uploader: false, file, convert_ext: extension })
  }

  clearEncode = () => {
    this.setState(this.initialState)
  }

  render() {
    const { uploader } = this.state
    return (
      <div className="App">
        <Route exact path="/" render={props => (
          <div className="wrapper">
            { uploader ?
              <Uploader initEncoding={this.initEncoding} /> :
              <Encoder />
            }
          </div>
        )}>
        </Route>
      </div>
    )
  }
}

export default App
