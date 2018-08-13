const uuidv4 = require('uuid/v4')

module.exports = (options = null) => {
  return (req, res, next) => {
    const uid = req.cookies._uid
    if(uid === undefined) {
      res.cookie('_uid', uuidv4(), { maxAge : (3600000 * 24) * 30 , httpOnly: false, domain : '127.0.0.1' })
    } else {
    }
    next()
  }
}
