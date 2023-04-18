const routerMessage = require('./message.routes')
const routerUser = require('./user.routes')
const router = require('express').Router()

router.use('/user', routerUser)
router.use('/message', routerMessage)

module.exports = router