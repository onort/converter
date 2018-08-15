import React, { Component } from 'react'
import axios from 'axios'
import toastr from 'toastr'

import { Progress } from '../'
import './Uploader.scss'

class Uploader extends Component {

  initialState = {
    allowed_types : [
      'webm', 'mkv', 'flv', 'ogg', 'avi', 'mov' , 'wmv', 'mp4',
      'm4v', 'm4p', 'mpeg', '3gp', '3g2'
    ],
    convert_ext: null,
    file: null,
    progress: 0,
    upload_ext: null,
    uploading: false,
  }
  
  state = this.initialState

  fileInput = React.createRef()

  getFileExtension = name => {
    return /(?:\.([^.]+))?$/.exec(name)[1]
  }

  validateFile = extension => this.state.allowed_types.includes(extension)

  onFileChange = e => {
    if(!e.target.files.length) return
    let file = e.target.files[0]
    let extension = this.getFileExtension(file.name)
    if(this.validateFile(extension)) {
      this.setState({ file, upload_ext: extension })
    }
    else toastr.error('Error: Invalid file format.')
  }

  setConversionFormat  = e => {
    const selectedExtension = e.target.value
    if(!selectedExtensionlength) {
      this.setState({ convert_ext: '' })
      return
    }
    this.setState({ convert_ext: selectedExtension })
  }

  initFileUpload = e => this.fileInput.current.click()

  cancelFileUpload = () => {
    this.setState(this.initialState)
    this.fileInput.current.value = ''
  }

  uploadFile = e => {
    const { convert_ext, file } = this.state
    if(file && convert_ext) {
      this.setState({ uploading: true })
      let data = new FormData()
      data.append('file', file)
      data.append('convert_ext', convert_ext)
      axios.post('/upload', data, {
        onUploadProgress: progressEvent => {
          let percentCompleted = Math.round(progressEvent.loaded * 100) / progressEvent.total
          this.setState({ progress: percentCompleted })
        }
      }).then(res => {
        let fileLoaded = res.data
        if(fileLoaded.uploaded) this.props.initEncoding(fileLoaded.path, convert_ext)
      }).catch(err => console.log('Error by loading data.', err))
    }
    else toastr.error('Error: Select a conversion format.')
  }

  render() {
    const { allowed_types, convert_ext, file, progress, upload_ext, uploading } = this.state
    return (
      <div className="uploader">
        {!uploading ? 
          <div>
            <div>
              { file ? 
                <button onClick={this.uploadFile}>Upload File</button> :
                <button onClick={this.initFileUpload}>Select Video File</button>
              }
              { file && <button onClick={this.cancelFileUpload}>Cancel</button> }
            </div>
            { file && 
              <div>
                <select value={convert_ext} onChange={this.setConversionFormat}>
                  <option value="">Convert To</option>
                  {
                    allowed_types.map(ext => {
                      if(ext !== upload_ext) return <option key={ext} value={ext}>{ext}</option>
                    })
                  }
                </select>
              </div>
            }
            <input type="file" name="file" className="form-control-file" ref={this.fileInput} onChange={this.onFileChange} />
          </div> :
          <Progress title="Uploading file..." progress={progress} />
        }
      </div>
    )
  }
}

export default Uploader
