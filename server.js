const config = require('config')
const cookieParser = require('cookie-parser')
const express = require('express')
const fs = require('fs')
const multer = require('multer')
const path = require('path')

// require('pretty-error').start()
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const PORT = config.get('port')
const cookieMiddleware = require('./middleware/userCookie')
 
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use('/', express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(cookieMiddleware())

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, 'uploads'))
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage, limits: 1000000000 })
 
app.post('/upload', upload.single('file'), (req, res) => {
  if(req.file) {
    const video = req.file
    const user = req.cookies._uid
    const uploadPath = video.path
    const userUploadPath = path.join(__dirname, '/uploads/', user)
    const videoPath = path.join(__dirname, '/uploads/', user, video.filename)
    fs.exists(userUploadPath, exists => {
      if(!exists) {
        fs.mkdir(userUploadPath, err => {
          if(err) return console.log(err)
          moveUploadedFileToUserDir(uploadPath, videoPath, video.filename, res)
        })
      }
      else moveUploadedFileToUserDir(uploadPath, videoPath, video.filename, res)
    })
    createUserEncodeDir(user)
  }
  else res.json({ uploaded: false })
})

app.get('*', (req, res) => {
  res.render('app');
})

const moveUploadedFileToUserDir = (uploadPath, videoPath, videoFilename, res) => {
  console.log('moveUploadedFileToUserDir fired.')
  fs.rename(uploadPath, videoPath, err => {
    if(err) throw err
    res.json({ uploaded: true, filename: videoFilename })
  })
}

const createUserEncodeDir = user => {
  console.log('createUserEncodeDir fired.')
  const dir = path.join(__dirname, 'encoded', user)
  fs.exists(dir, exists => {
    if(!exists) {
      fs.mkdir(dir, err => {
        if(err) return console.log(err)
      })
    }
    else return
  })
}
 
server.listen(PORT, () => console.log('Server running on Port: '+ PORT))
