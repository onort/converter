import React, { Component, Fragment } from 'react'
import toastr from 'toastr'
import Cookie from 'js-cookie'
import socketIOClient from 'socket.io-client'

import { Progress } from '../'
import './Encoder.scss'

class Encoder extends Component {

  state = {
    convert_ext: this.props.convert_ext,
    encoded_file: '',
    eta: '',
    file: this.props.file,
    progress: 0,
  }

  componentDidMount() {
    const { convert_ext, file } = this.state
    this.socket = socketIOClient('http://127.0.0.1:3000')
    this.socket.emit('encode', {
      file,
      user: Cookie('_uid'),
      convert_ext,
    })
    this.socket.on('progress', data => {
      this.setState({ progress: data.percentage, eta: data.eta })
    })
    this.socket.on('complete', data => {
      this.setState({ encoded_file: data.encoded_file })
      toastr.success('Encoding complete.')
    })
  }

  componentWillUnmount() {
    this.socket.disconnect()
    this.props.newEncode()
  }

  render() {
    const { encoded_file, eta, file, progress } = this.state
    return (
      <div className="encoder">
        <h3>
          {file.substring(file.indexOf('_') + 1)}<br />
          <small>ETA: { eta.trim().length ? eta : 'calculating ...' }</small>
        </h3>
        <Progress title="" progress={progress} />
        { encoded_file ?
          <div>
            <a href={`/encoded/${Cookie('_uid')}/${encoded_file}`} download>
              <button>Download</button>
            </a>
            <button onClick={this.props.newEndoe}>New Upload</button>  
          </div> :
          <button onClick={this.props.newEndoe}>Cancel Upload</button>
        }
      </div>
    )
  }
}

export default Encoder
