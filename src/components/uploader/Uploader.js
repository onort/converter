import React, { Component } from 'react'
import axios from 'axios'
import toastr from 'toastr'

import { Progress } from '../'
import './Uploader.scss'

class Uploader extends Component {
  
  state = {
    file: null,
    uploading: false,
    progress: 0,
    upload_ext: null,
    convert_ext: null,
    allowed_types : [
      'webm', 'mkv', 'flv', 'ogg',
      'avi', 'mov' , 'wmv', 'mp4',
      'm4v', 'm4p', 'mpeg', '3gp',
      '3g2'
    ]
  }

  getFileExtension = name => {
    return /(?:\.([^.]+))?$/.exec(name)[1]
  }

  validateFile = extension => this.state.allowed_types.includes(extension)

  onFileChange = () => {}

  setConversionFormat  = () => {}

  initFileUpload = () => {}

  cancelFileUpload = () => {}

  uploadFile = () => {}

  render() {
    const { file, uploading } = this.state
    return (
      <div className="uploader">
        {!uploading ? 
          <div>
            <div>
              { file ? 
                <button onClick={this.uploadFile}>Upload File</button> :
                <button onClick={this.selectFile}>Select Video File</button>
              }
              { file && <button onClick={this.cancelFileUpload}>Cancel</button> }
            </div>
          </div> :
          <Progress />
        }
      </div>
    )
  }
}

export default Uploader
