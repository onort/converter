const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const config = require('config')
const cookieParser = require('cookie-parser')

// require('pretty-error').start()
const PORT = config.get('port')
const cookieMiddleware = require('./middleware/userCookie')
 
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use('/', express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(cookieMiddleware())
 
app.get('*', (req, res) => {
    res.render('app');
})
 
server.listen(PORT, () => console.log('Server running on Port: '+ PORT))
