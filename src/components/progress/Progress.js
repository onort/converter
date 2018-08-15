import React from 'react'

import './Progress.scss'

const Progress = ({ title, progress }) => {
  return (
    <div className="progress-container">
      <h2>{title}</h2>
      <progress value={progress} max={100} className="prgress" />
      <div>{progress} &#37;</div>
    </div>
  )
}

export default Progress
