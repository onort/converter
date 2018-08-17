import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Cookie from 'js-cookie'

import { Encoder, Uploader } from './components'
import './App.scss'

console.log(`Uid is ${Cookie('_uid')}`)

class App extends Component {

  initialState = {
    convert_ext: '',
    encoder: false,
    file: '',
    uploader: true,
  }

  state = this.initialState

  initEncoding = (file, extension) => {
    this.setState({ encoder: true, uploader: false, file, convert_ext: extension })
  }

  clearEncode = () => {
    this.setState(this.initialState)
  }

  render() {
    const { convert_ext, file, uploader } = this.state
    return (
      <div className="App">
        <Route exact path="/" render={props => (
          <div className="wrapper">
            { uploader ?
              <Uploader initEncoding={this.initEncoding} /> :
              <Encoder file={file} convert_ext={convert_ext} newEncode={this.clearEncode} /> 
            }
          </div>
        )}>
        </Route>
      </div>
    )
  }
}

export default App
