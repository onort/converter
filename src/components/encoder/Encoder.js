import React, { Component, Fragment } from 'react'
import toastr from 'toastr'
import Cookie from 'js-cookie'
import socketIOClient from 'socket.io-client'

import { Progress } from '../'
import './Encoder.scss'

class Encoder extends Component {

  state = {
    file: this.props.file,
    encoded_file: '',
    convert_ext: this.props.convert_ext,
    progress: 0,
    eta: '',
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const { encoded_file, file } = this.state
    return (
      <div>

      </div>
    )
  }
}

export default Encoder

